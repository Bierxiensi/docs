```js


        // Create the request
        var req = transport.request(options, function handleResponse(res) {
            if (req.aborted) return;

            // uncompress the response body transparently if required
            var stream = res;

            // return the last request in case of redirects
            var lastRequest = res.req || req;

            // if no content, is HEAD request or decompress disabled we should not decompress
            if (
                res.statusCode !== 204 &&
                lastRequest.method !== "HEAD" &&
                config.decompress !== false
            ) {
                switch (res.headers["content-encoding"]) {
                    /*eslint default-case:0*/
                    case "gzip":
                    case "compress":
                    case "deflate":
                        // add the unzipper to the body stream processing pipeline
                        stream = stream.pipe(zlib.createUnzip());

                        // remove the content-encoding in order to not confuse downstream operations
                        delete res.headers["content-encoding"];
                        break;
                }
            }

            var response = {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: res.headers,
                config: config,
                request: lastRequest,
            };

            if (config.responseType === "stream") {
                response.data = stream;
                settle(resolve, reject, response);
            } else {
                var responseBuffer = [];
                var totalResponseBytes = 0;
                stream.on("data", function handleStreamData(chunk) {
                    responseBuffer.push(chunk);
                    totalResponseBytes += chunk.length;

                    // make sure the content length is not over the maxContentLength if specified
                    if (
                        config.maxContentLength > -1 &&
                        totalResponseBytes > config.maxContentLength
                    ) {
                        // stream.destoy() emit aborted event before calling reject() on Node.js v16
                        rejected = true;
                        stream.destroy();
                        reject(
                            createError(
                                "maxContentLength size of " +
                                    config.maxContentLength +
                                    " exceeded",
                                config,
                                null,
                                lastRequest
                            )
                        );
                    }
                });

                stream.on("aborted", function handlerStreamAborted() {
                    if (rejected) {
                        return;
                    }
                    stream.destroy();
                    reject(
                        createError(
                            "error request aborted",
                            config,
                            "ERR_REQUEST_ABORTED",
                            lastRequest
                        )
                    );
                });

                stream.on("error", function handleStreamError(err) {
                    if (req.aborted) return;
                    reject(enhanceError(err, config, null, lastRequest));
                });

                stream.on("end", function handleStreamEnd() {
                    var responseData = Buffer.concat(responseBuffer);
                    if (config.responseType !== "arraybuffer") {
                        responseData = responseData.toString(
                            config.responseEncoding
                        );
                        if (
                            !config.responseEncoding ||
                            config.responseEncoding === "utf8"
                        ) {
                            responseData = utils.stripBOM(responseData);
                        }
                    }

                    response.data = responseData;
                    settle(resolve, reject, response);
                });
            }
        });

        // Handle errors
        req.on("error", function handleRequestError(err) {
            if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS") return;
            reject(enhanceError(err, config, null, req));
        });

        // Handle request timeout
        if (config.timeout) {
            // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
            var timeout = parseInt(config.timeout, 10);

            if (isNaN(timeout)) {
                reject(
                    createError(
                        "error trying to parse `config.timeout` to int",
                        config,
                        "ERR_PARSE_TIMEOUT",
                        req
                    )
                );

                return;
            }

            // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
            // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
            // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
            // And then these socket which be hang up will devoring CPU little by little.
            // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
            req.setTimeout(timeout, function handleRequestTimeout() {
                req.abort();
                var transitional = config.transitional || defaults.transitional;
                reject(
                    createError(
                        "timeout of " + timeout + "ms exceeded",
                        config,
                        transitional.clarifyTimeoutError
                            ? "ETIMEDOUT"
                            : "ECONNABORTED",
                        req
                    )
                );
            });
        }

        if (config.cancelToken || config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = function (cancel) {
                if (req.aborted) return;

                req.abort();
                reject(
                    !cancel || (cancel && cancel.type)
                        ? new Cancel("canceled")
                        : cancel
                );
            };

            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted
                    ? onCanceled()
                    : config.signal.addEventListener("abort", onCanceled);
            }
        }

        // Send the request
        if (utils.isStream(data)) {
            data.on("error", function handleStreamError(err) {
                reject(enhanceError(err, config, null, req));
            }).pipe(req);
        } else {
            req.end(data);
        }
        
```

#### 简介
> 开源的移动开发框架,允许用标准的web技术-HTML5,CSS3和JavaScript做跨平台开发

<img src="http://cordova.axuer.com/static/img/guide/cordovaapparchitecture.png" height="400" width="480"></img>


#### 安装Cordova Cli
```
npm install -g cordova
```
#### 创建App
```
cordova create myApp
```
#### 进入子目录
```
cd myApp
```
#### 给App添加目标平台


web端开发环境browser
```
cordova platform add browser
```
移动端开发环境
```
cordova platform add ios --save
cordova platform add android --save
```


#### 移除App目标平台
```
cordova platform remove XXX --save
```


#### 查看平台设置状况和运行环境要求
```
cordova platform ls


```

张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_14-43-59.png

#### 查看运行环境要求
```
cordova requirements
```


张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_14-52-0.png



重新安装环境后（这一步有可能会遇到很多坑，如果Android SDK和Gradle安装有问题，特别是自定义安装目录、安装过程漏掉勾选项、和以前安装过的版本冲突时（环境变量位置不一致），建议卸掉在默认目录重装）

张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_16-14-10.png



#### 虚拟设备调试
```
cordova emulate android
```
张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_17-15-57.png



#### 构建APP
```
cordova build
```


张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_16-21-56.png



#### 应用发布
android stdio应用[发布](https://developer.android.com/studio/publish?hl=zh-cn)





















































#################################################################

### 简介
> Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架，[提供了一个开箱即用的应用程序体系结构](https://nestjs.bootcss.com/)。


### 安装与运行
#### 1\. 前置
- node
- npm包管理工具
```
npm i -g @nestjs/cli
nest new project-name
npm run start
```
#### 2\. 启动效果
<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/nest_run_20210617.png" width="780" height="140"></img>	


入口/get	
	
<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/nest_run_hello_20210617.png" width="480" height="140"></img>		
### 起步使用
#### 1\. 项目结构
<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/nest_struct_20210617.png" width="480" height="280"></img>	
- main.ts：应用程序入口，使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
- app.service.ts：service层，具有单一方法的基本服务（service）method
- app.controller.ts：controller层，带有单个路由的基本控制器
- app.model.ts：model层，T应用程序的根模块（root module）
- app.controller.spec.ts：单元测试层


#### 2\. 分层分析 - main.ts
<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/main_20210617.png" width="480" height="280"></img>
- 定义了异步函数bootstrap，引导应用程序的启动过程
- 使用了 NestFactory 核心类创建了一个 Nest 应用程序的实例
- NestFactory 暴露了一些静态方法用于创建应用程序的实例。其中，create() 方法返回一个应用程序的对象
- app实例监听3000端口


#### 3\. 分层分析 - app.service.ts
<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/service_20210617.png" width="480" height="280"></img>
- 定义了一个函数getHello()并导出为AppService
- 使用[@Injectable](https://nestjs.bootcss.com/components)（can be managed by the Nest IoC container）装饰器装饰Appservice

#### 4\. 分层分析 - app.controller.ts
<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/controller_20210617.png" width="480" height="280"></img>
- 消费了AppServie，返回值为AppServie中getHello()的返回值
- 定义了一个函数并导出为AppController
- 使用[@Controller](https://nestjs.bootcss.com/controllers)（allows us to easily group a set of related routes, and minimize repetitive code.）装饰器装饰AppController
- 使用[@get](https://nestjs.bootcss.com/controllers)(tells Nest to create a handler for a specific endpoint for HTTP requests. )装饰器装饰函数getHello,这里可以自己规定请求入口


#### 5\. 分层分析 - app.model.ts
<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/module_20210617.png" width="480" height="280"></img>

创建一个AppModel关联service和controller，使用@Modal装饰器装饰，此model即为根model，在入口文件处导入即可。
- A feature module simply organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries
- Each application has at least one module, a root module. 
- The @Module() decorator takes a single object describe the module.
- The last thing we need to do is import this module into the root module (the AppModule, defined in the app.module.ts file).

#### 6\. 分层分析 - dto（自建）
数据验证(格式、非空),安装class-validator
```
npm i --save class-validator class-transformer
```
......





################################################



## 简介
> Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架，[提供了一个开箱即用的应用程序体系结构](https://nestjs.bootcss.com/)。

## 前置
> [一个创建好的nest框架](http://wiki.bianjie.ai/pages/viewpage.action?pageId=50108482)

## 模块导航
* 	[1.Modules](#Modules)										--OK
* 	[2.Controllers](#Controllers)								--OK
	*	[nest-swagger](#nest-swagger)							--OK
* 	[3.Providers](#Providers)									--writing...
*	[4.Middleware](#Middleware)									--OK
* 	[5.Pipes](#Pipes)											--learning...



### 1\. <span id="Modules">Modules</span>


> a class annotated with a @Module() decorator
> The @Module() decorator provides metadata that Nest makes use of to organize the application structure.


Modules，即组织层，职责是组织相关模块


<img src="https://docs.nestjs.com/assets/Modules_1.png" height="420" width="920"></img>


@Module()装饰器接受一个对象，其属性描述了该模块，属性分别是:


- providers
	提供商，提供了service服务
- controllers
	控制器，提供了控制器集合
- imports
	依赖注入	
- exports
	模块导出

### 2\. <span id="Controllers">Controllers</span>

> Controllers are responsible for handling incoming requests and returning responses to the client.
> Frequently, each controller has more than one route, and different routes can perform different actions.

<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/Controllers_20210617.png" height="420" width="920"></img>

Controllers，即控制层，职责是接收客户端请求并发送结果给对方。

- Routing
在@Controller()指定路由前缀,@Get()指定方法入口
```
import { Controller, Get } from '@nestjs/common';

@Controller('/hello')
export class CatsController {
  @Get('/get')
  getHello() {
    return 'hello';
  }
}
```


- Request object
@Req()装饰器，指示Nest注入请求对象，从而访问请求对象。
```
import { Controller, Bind, Get, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  @Bind(Req())
  findAll(request) {
    return 'This action returns all cats';
  }
}
```


- Resources
@Post()创建新资源
```
import { Controller, Post } from '@nestjs/common';

@Controller('/hello')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
```

- Route wildcards
字符?、+、*和()可以在路由路径中使用，它们是正则表达式对应的子集，匹配符合规则的路由。
```
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```


- Status code
@HttpCode()设定响应状态码
```
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```


- Header
@Header()自定义响应头
```
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```


- Redirection
@Redirect()请求重定向
```
@Get()
@Redirect('https://nestjs.com', 301)
```


- Route parameters
@Param()接收URL中的参数
```
@Get(':id')
@Bind(Param())
findOne(params) {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```
Express写法
```
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```
通过名称直接引用路由参数
```
@@filename()
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}
@@switch
@Get(':id')
@Bind(Param('id'))
findOne(id) {
  return `This action returns a #${id} cat`;
}
```


- Sub-Domain Routing
@Controller装饰器可以采用一个主机选项来要求传入请求的HTTP主机匹配某个特定的值。
```
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
```


- Scopes

...


- Asynchronicity
支持异步,返回p、Promise()
```
@Get()
async findAll(): Promise<any[]> {
  return [];
}
@Get()
async findAll() {
  return [];
}
```


- Request payloads
@Body()接收post请求参数，需先创建DTO
```
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}


@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```


- Handling errors
[错误处理](https://nestjs.bootcss.com/exception-filters)

##### <span id="nest-swagger">nest-swagger</span>
[安装nest-swagger](https://docs.nestjs.com/openapi/introduction)
```
  npm install --save @nestjs/swagger swagger-ui-express

```
引入swagger包
```
  import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
```
进行信息项配置
```
  // swagger配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-swagger') 
    .setDescription('zxy-learning')
    .setVersion('1.0')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
```
<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/swagger_20210617.png" height="670" width="1620"></img>


### 3\. <span id="Providers">Providers</span>
> Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. 
> It can inject dependencies.

<img src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/server/nest/provides_20210617.png" height="420" width="720"></img>

Providers即提供者，可以注入依赖项，服务、存储库、工厂、帮助程序等都可以被视为提供者。如控制器Controllers应该处理HTTP请求，并将更复杂的任务委托给提供者。


- Services


### 4\. <span id="Middleware">Middleware</span>
> a function which is called before the route handler.


中间件，在请求前使用中间件进行相关处理

<img src="https://nestjs.bootcss.com/assets/Middlewares_1.png" height="420" width="720"></img>


- 实现自NestMiddleware 
	
```
import { NestMiddleware } from '@nestjs/common';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```


- Applying middleware


全局注册LoggerMiddleware,全局匹配路由cats
```
const app = await NestFactory.create(AppModule);
app.use(logger);
```


局部注册helloMiddleware 
```
import { Module, RequestMethod } from '@nestjs/common';
import { helloMiddleware } from './common/middleware/hello.middleware';


export class helloModule {
  configure(consumer) {
    consumer
      .apply(helloMiddleware)
      .forRoutes('cats');
  }
}
```


- Route wildcards


支持基于模式的路由。字符?、+、*和()可以在路由路径中使用，它们是正则表达式对应的子集，匹配符合规则的路由。
```
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```


- Excluding routes


exclude()方法排除某些路由以避免使用中间件	
```
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST }
  )
  .forRoutes(CatsController);
```

### 5\. <span id="Pipes">Pipes</span>



......











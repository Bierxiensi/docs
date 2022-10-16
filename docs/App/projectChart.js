!function (){
    let option = null;
    let myChart = null;
    option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'SaaS' },
              { value: 735, name: 'CRM' },
              { value: 580, name: 'ZTXK' },
              { value: 484, name: 'KYG' },
              { value: 300, name: 'Others' }
            ]
          }
        ]
    };

    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById('projectChart'));

    myChart && myChart.setOption(option);

}()
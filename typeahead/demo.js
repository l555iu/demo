/**
 * Created by jingxian.lzg on 2015/7/23.
 */
var app = angular.module('sellerApp', []);

// 默认所有数据
var tempSearchArray = [];

app.controller('sellerCtrl', function($scope) {

    var demo_data = [];
    demo_data.push({"val": "abc"});
    demo_data.push({"val": "abd"});
    demo_data.push({"val": "abf"});
    demo_data.push({"val": "abg"});
    demo_data.push({"val": "acc"});
    demo_data.push({"val": "acg"});
    demo_data.push({"val": "ac1"});
    demo_data.push({"val": "adc"});
    demo_data.push({"val": "adb"});
    demo_data.push({"val": "a1c"});
    demo_data.push({"val": "a1c"});
    demo_data.push({"val": "a2c"});

    // 搜索 and cache
    var searchList = [];
    for (var i = 0; i < demo_data.length; i++) {
        var val = demo_data[i].val;
        tempSearchArray.push(val);
        searchList.push({"val": val});
    }
    // 引擎部分
    var indicatorSearchEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('val'),// 分词
        queryTokenizer: Bloodhound.tokenizers.whitespace,// 查找
        identify: function (obj) {
            return obj.val;
        },
        local: searchList // 数据源
    });
    // 组件初始化
    $('.typeahead').typeahead({
            minLength: 0,
            highlight: true
        },
        {
            name: 'demo',
            limit: 10000,
            display: 'val',
            source: search
        });
    // 设置监听事件
    $('.typeahead').bind('typeahead:select', function (ev, suggestion) {
        // 因为这个事件是外部dom触发的，不在angular内 需要处理才能影响到angular的$scope
        var scope = angular.element($("input")).scope();
        scope.$apply(function () {
            $scope.searchValue = suggestion.val;
            console.log($scope.searchValue);
        });
    });
    $('.typeahead').bind('typeahead:close', function () {
        // 拿到值
        var inputValue = $('.tt-input').typeahead('val');
        var scope = angular.element($("input")).scope();
        scope.$apply(function () {
            if (inputValue != $scope.searchValue) {
                console.log(inputValue + " vs " + $scope.searchValue);
                $scope.searchValue = undefined;
            }
        });
    });

    function search(q, sync) {
        if (!q || q === '') {
            sync(indicatorSearchEngine.get(tempSearchArray));
        } else {
            indicatorSearchEngine.search(q, sync);
        }
    }
})
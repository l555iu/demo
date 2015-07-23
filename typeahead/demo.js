/**
 * Created by jingxian.lzg on 2015/7/23.
 */
var app = angular.module('sellerApp', []);

// Ĭ����������
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

    // ���� and cache
    var searchList = [];
    for (var i = 0; i < demo_data.length; i++) {
        var val = demo_data[i].val;
        tempSearchArray.push(val);
        searchList.push({"val": val});
    }
    // ���沿��
    var indicatorSearchEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('val'),// �ִ�
        queryTokenizer: Bloodhound.tokenizers.whitespace,// ����
        identify: function (obj) {
            return obj.val;
        },
        local: searchList // ����Դ
    });
    // �����ʼ��
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
    // ���ü����¼�
    $('.typeahead').bind('typeahead:select', function (ev, suggestion) {
        // ��Ϊ����¼����ⲿdom�����ģ�����angular�� ��Ҫ�������Ӱ�쵽angular��$scope
        var scope = angular.element($("input")).scope();
        scope.$apply(function () {
            $scope.searchValue = suggestion.val;
            console.log($scope.searchValue);
        });
    });
    $('.typeahead').bind('typeahead:close', function () {
        // �õ�ֵ
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
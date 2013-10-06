function Ctrl($scope) {
 $scope.yourName = 'Wonderbits';
}

angular.module('components', []).
  directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
       '<div class="tabbable">' + 
       '<ul class="nav nav-tabs">' + 
       '<li>' + 
       '<a href="">{{pane.title}}</a>' + 
       '</li>' + 
       '</ul>' + 
       '<div class="tab-content">&nbsp;</div>' + 
       '</div>',
      replace: true
    };
  }).
  directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
       '<div class="tab-pane">' + '</div>',
      replace: true
    };
  })
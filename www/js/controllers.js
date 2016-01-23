angular.module('starter.controllers', [])
.run(function($http) {
    $http.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
})
.factory('groupsInPost', function($resource) {
  return $resource('/api/posts/:id', {id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
})
.controller('DashCtrl', function($scope, $location, $rootScope, $http, $ionicLoading,  group, groupsInPost) {

$scope.refreshPost = function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $http.get('/api/posts')
    .success(function(response) {
      $scope.posts = response;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      console.log('scroll.refreshComplete')
    }).error(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
  var refreshPost = function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    
    $http.get('/api/posts/')
    .success(function(response) {
      $scope.posts = response;
      $ionicLoading.hide();
      $scope.post = "";
      console.log("response: " + response)
    }).error(function(response){
      console.log("there was an error: " + response)
    });
  }
  refreshPost();
$scope.removeFromGroup = function(post_id) {
  var favorite = $scope.favorite;
  $scope.post = groupsInPost.get({id: post_id }, function() {

    var array = $scope.post.group;
    var index = array.indexOf(favorite);

    if (index > -1) {
      array.splice(index, 1);
    }
    $scope.post.$update(function() {
      // updated in the backend
    });
  });
};

  $scope.readLater = function(post_id) {
    $scope.isLoading = true;
    $scope.post = groupsInPost.get({ id: post_id }, function() {
      $scope.post.readlater = true;
      console.log('added to readLater')
      console.log($scope.post.readlater)
      $scope.post.$update(function() {
        refreshPost()
        $scope.isLoading = false;
      });
    });
  }
  $scope.markAsRead = function(post_id) {
    $scope.isLoading = true;
    $scope.post = groupsInPost.get({ id: post_id }, function() {
      $scope.post.readlater = false;
      console.log('marked as read')
      $scope.post.$update(function() {
        refreshPost()
        $scope.isLoading = false;
      });
    });
  }
  $scope.favoritePost = function(post_id) {
    $scope.isLoading = true;
    $scope.post = groupsInPost.get({ id: post_id }, function() {
      $scope.post.favorite = true;
      console.log('added to favorites')
      $scope.post.$update(function() {
        refreshPost()
        $scope.isLoading = false;
      });
    });
  };
  $scope.removeFavorite = function(post_id) {
    $scope.isLoading = true;
    $scope.post = groupsInPost.get({ id: post_id }, function() {
      $scope.post.favorite = false;
      console.log('removed from favorites');

      $scope.post.$update(function() {
        refreshPost()
        $scope.isLoading = false;
      });
    });
  };

  $scope.clearSearch = function() {
    $scope.search = '';
  }
  $scope.remove = function(id) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    console.log(id);
    $http.delete('/api/posts/' + id).success(function(response) {
      refreshPost();
      $ionicLoading.hide()
    });
  };
  $scope.refreshCategory = function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $http.get('/api/groups')
    .success(function(response) {
      $scope.categories = response;
      $ionicLoading.hide()
      $scope.$broadcast('scroll.refreshComplete');
    }).error(function(response){
      console.log("there was an error: " + response)
      $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide()
    });
  }
  var refreshCategory = function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $http.get('/api/groups')
    .success(function(response) {
      $scope.categories = response;
      $ionicLoading.hide()
      console.log("response: " + response)
    }).error(function(response){
      $ionicLoading.hide()
      console.log("there was an error: " + response)
    });
  }
  refreshCategory();

  $scope.searchCategory = group;

  $scope.getGroup = function(group_id){
    if(group_id) {
      $scope.searchCategory.search = group_id;
      console.log($scope.searchCategory.search);
    } else {
      $scope.searchCategory.search = ' ';
      console.log('swiped!')
      console.log($scope.searchCategory.search)
    }
  }

})


.controller('CategoryDetailCtrl', function($scope, $ionicLoading, $rootScope, $location, $http, group, groupsInPost) {

  $scope.removeFromGroup = function(post_id) {
    var favorite = $scope.favorite;
    $scope.post = groupsInPost.get({id: post_id }, function() {

      var array = $scope.post.group;
      var index = array.indexOf(favorite);

      if (index > -1) {
        array.splice(index, 1);
      }
      $scope.post.$update(function() {
        // updated in the backend
      });
    });
  };
  $scope.readLater = function(post_id) {
    $scope.isLoading = true;
    $scope.post = groupsInPost.get({id: post_id }, function() {
      $scope.post.readlater = true;
      console.log('added to readLater')
      console.log($scope.post.readlater)
      $scope.post.$update(function() {
        refreshPost()
        $scope.isLoading = false;
      });
    });
  }
  $scope.markAsRead = function(post_id) {
    $scope.isLoading = true;
    $scope.post = groupsInPost.get({id: post_id }, function() {
      $scope.post.readlater = false;
      console.log('marked as read')
      $scope.post.$update(function() {
        refreshPost()
        $scope.isLoading = false;
      });
    });
  }
  $scope.favoritePost = function(post_id) {
    $scope.isLoading = true;
    $scope.post = groupsInPost.get({id: post_id }, function() {
      $scope.post.favorite = true;
      console.log('added to favorites')
      $scope.post.$update(function() {
        refreshPost()
        $scope.isLoading = false;
      });
    });
  };
  $scope.removeFavorite = function(post_id) {
    $scope.isLoading = true;
    $scope.post = groupsInPost.get({id: post_id }, function() {
      $scope.post.favorite = false;
      console.log('removed from favorites');

      $scope.post.$update(function() {
        refreshPost()
        $scope.isLoading = false;
      });
    });
  };
  $scope.refreshPost = function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $http.get('/api/posts')
    .success(function(response) {
      $scope.posts = response;
      $ionicLoading.hide()
      $scope.post = "";
      $scope.$broadcast('scroll.refreshComplete');
      console.log("response: " + response)
    }).error(function(response){
      $ionicLoading.hide()
      $scope.$broadcast('scroll.refreshComplete');
      console.log("there was an error: " + response)
    });
  }
  var refreshPost = function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $http.get('/api/posts') 
    .success(function(response) {
      $ionicLoading.hide()
      $scope.posts = response;
      $scope.post = "";
      console.log("response: " + response)
    }).error(function(response){
      $ionicLoading.hide()
      console.log("there was an error: " + response)
    });
  }
  refreshPost();

  $scope.searchCategory = group;

  $scope.getGroup = function(){
    $scope.searchCategory.search = group.search;
    $scope.searchCategory.name = group.name;
  }
})
.controller('LoginCtrl', function($scope, $rootScope, $ionicModal, $timeout, $location) {
    $scope.loginPage = true;
    var images = ["https://images.unsplash.com/uploads/14116941824817ba1f28e/78c8dff1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=bdf1e263a1d23855c66d335b0893c1c9", "https://images.unsplash.com/uploads/1413395496082cbc91228/43e39040?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=43643af8333d4a0eeda321ad10f0cc7d", "https://images.unsplash.com/reserve/yapfjxRqy2d2rGRNc2yQ_zavrsnica-9-indie.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=d683eebfbe877598d2c8abef7b4a8fc2","https://images.unsplash.com/photo-1446185250204-f94591f7d702?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=7a53642f59107b10caa2eff33fce94f5", "https://images.unsplash.com/photo-1442606440995-d0be22c5f90f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=13397bac410c5abf133597495709de45", "http://i.imgur.com/2zgo8Zz.jpg", "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=d67cf1c5975186e79bad375a4991b014", "https://images.unsplash.com/photo-1438480478735-3234e63615bb?crop=entropy&dpr=2&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1350", "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=9580e27795d8af74b7ea143e70a71636", "https://images.unsplash.com/photo-1429091967365-492aaa5accfe?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=86e121d524b82188d773395446707cf0", "https://images.unsplash.com/reserve/e66NHyUFQx6lNahLbW6g_IMG_2536_2.jpg?crop=entropy&dpr=2&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1350", "https://images.unsplash.com/photo-1416854905195-f4c96ea8f949?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=1f558147ba9c86f1890f9d3783be5add"]

    var image = images[Math.floor(Math.random()*images.length)];

    document.getElementsByClassName('scroll-content')[0].setAttribute('style', 'background-image: url("'+image+'")');
    document.getElementsByClassName('bar-subheader')[0].setAttribute('style', 'display:none;');

    var i = 100;
    var loop = setInterval(function(){
     document.getElementsByClassName('pane')[0].setAttribute('style', '-webkit-filter:blur('+i+'px)');
     i--
    }, 5);

    setTimeout(function(){
    clearInterval(loop);
    }, 5000)
})
.controller('ProfileCtrl', function ($rootScope, $location, $scope, $http, $ionicLoading, group, groupsInPost) {
    $scope.group = {};
    $scope.loginPage = false;
  $scope.addGroup = function(groupName) {
    $scope.group = {name: groupName};

    $http.post('/api/groups', $scope.group).success(function(response){
      refreshGroup();
      console.log("$scope.group.name.val: " + $scope.group.name);
    });
    console.log($scope.group)
     
  };
  $scope.addNewCategory = function () {
      $scope.$broadcast('createNewCategory');
  };
  $scope.refreshCategory = function(){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $http.get('/api/groups')
  .success(function(response) {
    $scope.categories = response;
    $ionicLoading.hide()
    $scope.$broadcast('scroll.refreshComplete');
  }).error(function(response){
    console.log("there was an error: " + response)
    $scope.$broadcast('scroll.refreshComplete');
    $ionicLoading.hide()
  });
}
var refreshCategory = function(){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $http.get('/api/groups')
  .success(function(response) {
    $scope.categories = response;
    $ionicLoading.hide()
    console.log("response: " + response)
  }).error(function(response){
    $ionicLoading.hide()
    console.log("there was an error: " + response)
  });
}
refreshCategory();

$scope.searchCategory = group;

$scope.getGroup = function(group_id, name){
  if(group_id) {
    $scope.searchCategory.search = group_id;
    $scope.searchCategory.name = name;
    console.log($scope.searchCategory.search);
  } else {
    $scope.searchCategory.search = ' ';
    console.log('swiped!')
    console.log($scope.searchCategory.search)
  }
}

})

.filter( 'domain', function () {
  return function ( input ) {
    var matches,
        output = "",
        urls = /\w+:\/\/([\w|\.]+)/;

    matches = urls.exec( input );

    if ( matches !== null ) output = matches[1];

    return output;
  };
})
.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.onErrorSrc) {
              attrs.$set('src', attrs.onErrorSrc);
            }
          });
        }
    }
})
.directive('headerShrink', function($document) {
    var fadeAmt;

    var shrink = function(tabs, tabs_amt, subHeader, header, amt, dir) {
      ionic.requestAnimationFrame(function() { 
        // Threshold is equal to bar-height
        var threshold = 44;
        // Scrolling down
        if(dir === 1) {
          var _amt = Math.min(threshold, amt - threshold);
        } 
        // Scrolling up
        else if(dir === -1) {
          var _amt = Math.max(0, amt - threshold);
        }
        // The translation amounts should never be negative
        _amt = _amt < 0 ? 0 : _amt;
        amt = amt < 0 ? 0 : amt;
        tabs_amt = tabs_amt < 0 ? 0 : tabs_amt; 
        // Re-position the header
        header.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + _amt + 'px, 0)';
        fadeAmt = 1 - _amt / threshold; 
        for(var i = 0, j = header.children.length; i < j; i++) {
          header.children[i].style.opacity = fadeAmt;
        }
        // Re-position the sub-header
        subHeader.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + amt + 'px, 0)';
        // Re-position the tabs
        tabs.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + tabs_amt + 'px, 0)';
      });
    };

    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        var starty = 0;
        var shrinkAmt;
        var tabs_amt;
        // Threshold is equal to bar-height + create-post height;
        var threshold = 88;
        // header
        var header = $document[0].body.querySelector('.bar-header');
        // sub-header
        var subHeader = $document[0].body.querySelector('.bar-subheader');
        var headerHeight = header.offsetHeight;
        var subHeaderHeight = subHeader.offsetHeight;
        // tabs
        var tabs = $document[0].body.querySelector('.tabs');
        var tabsHeight = tabs.offsetHeight;

        var prev = 0
        var delta = 0
        var dir = 1
        var prevDir = 1
        var prevShrinkAmt = 0;
        var prevTabsShrinkAmt = 0;
        
        $element.bind('scroll', function(e) {
          // if negative scrolling (eg: pull to refresh don't do anything)
          if(e.detail.scrollTop < 0)
            return false;
          // Scroll delta
          delta = e.detail.scrollTop - prev;
          // Claculate direction of scrolling
          dir = delta >= 0 ? 1 : -1;
          // Capture change of direction
          if(dir !== prevDir) 
            starty = e.detail.scrollTop;
          // If scrolling up
          if(dir === 1) {
            // Calculate shrinking amount
            shrinkAmt = headerHeight + subHeaderHeight - Math.max(0, (starty + headerHeight + subHeaderHeight) - e.detail.scrollTop);
            // Calculate shrinking for tabs
            tabs_amt = tabsHeight - Math.max(0, (starty + tabsHeight) - e.detail.scrollTop);
            // Start shrink
            shrink(tabs, tabs_amt, subHeader, header, Math.min(threshold, shrinkAmt), dir);
            // Save prev shrink amount
            prevShrinkAmt = Math.min(threshold, shrinkAmt);
            prevTabsShrinkAmt = Math.min(tabsHeight, tabs_amt);
          }
          // If scrolling down
          else {
            // Calculate expansion amount
            shrinkAmt = prevShrinkAmt - Math.min(threshold, (starty - e.detail.scrollTop));
            // Calculate shrinking for tabs
            tabs_amt = prevTabsShrinkAmt - Math.min(tabsHeight, (starty - e.detail.scrollTop));
            // Start shrink
            shrink(tabs, tabs_amt, subHeader, header, shrinkAmt, dir);
          }
          // Save prev states for comparison 
          prevDir = dir;
          prev = e.detail.scrollTop;
        });
      }
    }
  }); 

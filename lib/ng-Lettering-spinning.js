

/* ng-Lettering-spinning.js v0.1
*  Rungsikorn Rungsikavarnich http://www.ios-rage.net
*
*
* Original ngLettering from
* https://github.com/patrickmarabeas/ng-Lettering.js
*
* Original jQuery project: https://github.com/davatron5000/Lettering.js
*
* Copyright 2013, Patrick Marabeas http://marabeas.io
* Released under the MIT license
* http://opensource.org/licenses/mit-license.php
*
* Date: 13/7/2015
*/

'use strict';

angular.module( 'ngLetteringExplode', [] )
.directive( 'lettering', [ function ($compile) {



	return {
		restrict: 'A',
		controllerAs:'letteringCtrl',
		controller:function($scope, $element, $attrs ,$compile ,$window,$timeout){
			windowHeight = $window.innerHeight;
			windowWidth = $window.innerWidth;
			var promise;
			$scope.activeText = false;
			this.rotateChar = function(i){
				spinCharToZero($scope,i)
			};

			this.rotateCharBack = function(i){
				spinToRand($scope,i)
			};
			var methods = {
				letters: function() {
					injector( $element, '', 'char', '' );
				},
				words: function() {
					injector( $element, ' ', 'word', ' ' );
				},
				lines: function() {
					var r = 'eefec303079ad17405c889e092e105b0';
					angular.element( $element ).children( 'br' ).replaceWith( r );
					injector( $element, r, 'line', '' );

				}
			};


			function injector( element, splitter, klass, after  ) {
				var a = element[0].innerHTML.split( splitter );
				var inject = '';

				if( a.length ) {
					angular.forEach( a, function( item, i ) {
						// ng-click="text()" ng-mouseleave="letteringCtrl.rotateCharBack('+(i)+')"  ng-mouseover="letteringCtrl.rotateChar('+(i)+')"
						inject += '<span ng-style="charStyle['+(i)+']" class="' + klass + (i + 1) + '">' + item + '</span>' + after;
					});
					while( element[0].hasChildNodes() ) {
						element[0].removeChild( element[0].firstChild );
					}
					element.append( inject );

				}
			}

			function setRandomizedPosition(){
				$scope.charStyle = []

				angular.forEach($element[0].childNodes,function(item ,i){
					var degree = Math.round( Math.random() * 30 ) * signage[ Math.round(Math.random() * 1) ]
					$scope.charStyle[i] = {
						transform: 'rotate(' + degree + 'deg) translate('+0+'px,'+0+'px) scale(0.4,0.4)',"font-size":32+"px",
						'-webkit-transform': 'rotate(' + degree + 'deg) translate('+0+'px,'+0+'px) scale(0.4,0.4)'
					}

				});
			}

			function rand(){console.log("rand");}
			$scope.method = $attrs.lettering || 'letters';
			methods[$scope.method]();
			$compile($element.contents())($scope);
			setRandomizedPosition();
			rand()
		},
		link: function( scope, element, attrs  ) {

			scope.$watch(attrs.unrotate, function (show) {
				if(show){
					spinBackAll(scope)
				}else {
					spinRandAll(scope)
				}
			});
		}
	}

}]);


var signage = [31,-31]
var	scale = 0.7
var windowHeight = 1;
var windowWidth = 1;
var transitionIn = function(){

	return '4.5s cubic-bezier(.75,.17,.53,1.11)';
};
var transitionOut = function(){

	return '9.5s cubic-bezier(.02,.99,.88,1.03)';
};
function spinCharToZero($scope,i){
	for (var j = i - 15;j<i+15;j++){

		$scope.charStyle[j] = {
			transition: transitionIn(),
			transform: 'rotate(' + 0 + 'deg) translate('+0+'px,'+0+'px) scale(1,1)',"font-size":32+"px",
			'-webkit-transform': 'rotate(' + 0 + 'deg) translate('+0+'px,'+0+'px) scale(1,1)'
		}
	}
}
function spinBackAll(scope){
	angular.forEach(scope.charStyle,function(item ,i){
		var degree = 0;
		var scale = 1;
		scope.charStyle[i] = {
			transition: transitionIn(),
			transform: 'rotate(' + degree + 'deg) translate('+0+'px,'+0+'px)',"font-size":32+"px",
			'-webkit-transform': 'rotate(' +degree + 'deg) translate('+0+'px,'+0+'px) scale(1,1)'
		}
	});
}

function spinRandAll (scope){


	angular.forEach(scope.charStyle,function(item ,i){
		var y = (Math.random() * windowHeight) - (windowHeight/2)
		var x = (Math.random() * windowWidth) - (windowWidth/2)

		var	degree = Math.round( Math.random() * 30 ) * signage[ Math.round(Math.random() * 1) ]
		scope.charStyle[i] = {
			transition: transitionOut(),
			transform: 'rotate(' + degree + 'deg) translate('+x+'px,'+y+'px)',"font-size":32+"px",
			'-webkit-transform': 'rotate(' +degree + 'deg) translate('+x+'px,'+y+'px) scale('+scale+','+scale+')'
		}
	});

}

function spinToRand($scope,i){
	if(i){
		for (var j = i - 15;j<i+15;j++){
			var degree = Math.round( Math.random() * 30 ) * signage[ Math.round(Math.random() * 1) ]

			$scope.charStyle[j] = {
			transition: transitionOut(),
			transform: 'rotate(' + degree + 'deg) translate('+0+'px,'+0+'px) scale(0.4,0.4)',"font-size":32+"px",
			'-webkit-transform': 'rotate(' + degree + 'deg) translate('+0+'px,'+0+'px) scale('+scale+','+scale+')'
			}
		}
	}else {

	}

}

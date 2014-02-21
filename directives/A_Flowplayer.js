// ########################################################################### //
// ########################################################################### //
//                                 - A_Flowplayer -                            //
// ########################################################################### //
// @author Silas Ribas <silasrm@gmail.com>                                     //
// ########################################################################### //
// ## Example:                                                              ## //
// ##                                                                       ## //
// ## Add scripts:                                                          ## //
// ## <script src="/js/vendor/flowplayer/flowplayer-3.1.4.min.js"></script> ## //
// ##                                                                       ## //
// ## <a href="[[ item.file ]]" flowplayer flowplayer-swf-url="/js/vendor/flowplayer/flowplayer-3.2.1.swf" flowplayer-callback="notifyFinishedContent(item.id)"></a>  ## //
// ########################################################################### //
define(
    [
        'app'
    ],
    function(app) {
        app
            .lazy
            .directive('flowplayer', function($parse) {
                return {
                    restrict: 'A',
                    scope: { flowplayerCallback:'&flowplayerCallback' },
                    link: function(scope, elem, attrs) {
                        var flowplayerCallback = scope.flowplayerCallback;

                        setTimeout(function(){
                            flowplayer(
                                attrs.id,
                                attrs.flowplayerSwfUrl,
                                {
                                    plugins: {
                                        controls: {
                                            backgroundColor: '#BDBDBB',
                                            progressColor: '#BDBDBB',
                                            bufferColor: '#524E4D',
                                            buttonColor: '#333333',
                                            fullscreen: false,
                                            height: 30,
                                            autoHide: false
                                        }
                                    },
                                    clip: {
                                        onFinish: function() {
                                            if(typeof flowplayerCallback !== 'undefined') {
                                                flowplayerCallback();
                                            }
                                        }
                                    }
                                }
                            );
                        }, 1000);
                    }
               };
            });
    }
);

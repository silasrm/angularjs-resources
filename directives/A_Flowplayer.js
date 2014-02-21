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
// ## <a href="[[ item.file ]]" flowplayer flowplayer-swf-url="/js/vendor/flowplayer/flowplayer-3.2.1.swf" flowplayer-callback="notifyFinishedContent(item.id)" flowplayer-background-color="#BDBDBB" flowplayer-progress-color="#BDBDBB" flowplayer-buffer-color="#524E4D" flowplayer-button-color="#333333" flowplayer-fullscreen="false" flowplayer-height="30" flowplayer-autoHide="false"></a>  ## //
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
                                            backgroundColor: attrs.flowplayerBackgroundColor || '#BDBDBB',
                                            progressColor: attrs.flowplayerProgressColor || '#BDBDBB',
                                            bufferColor: attrs.flowplayerBufferColor || '#524E4D',
                                            buttonColor: attrs.flowplayerButtonColor || '#333333',
                                            fullscreen: attrs.flowplayerFullscreen || false,
                                            height: attrs.flowplayerHeight || 30,
                                            autoHide: attrs.flowplayerAutoHide || false
                                        }
                                    },
                                    clip: {
                                        onFinish: function() {
                                            if(attrs.flowplayerCallback && typeof flowplayerCallback !== 'undefined') {
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

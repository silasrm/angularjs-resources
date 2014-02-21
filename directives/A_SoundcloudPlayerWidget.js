// ########################################################################### //
// ########################################################################### //
//                       - A_SoundcloudPlayerWidget -                          //
// ########################################################################### //
// @author Silas Ribas <silasrm@gmail.com>                                     //
// ########################################################################### //
// ## Documentation:                                                        ## //
// ## @see https://developers.soundcloud.com/docs/api/html5-widget          ## //
// ## @see http://developers.soundcloud.com/docs/api/reference#oembed       ## //
// ## @see http://developers.soundcloud.com/docs#playing                    ## //
// ##                                                                       ## //
// ## ATRIBUTTES                                                            ## //
// ##                                                                       ## //
// ## soundcloud="url"                                                      ## //
// ## soundcloud-widget-id="my-sc-widget"                                   ## //
// ## soundcloud-widget-auto-play="true"                                    ## //
// ## soundcloud-widget-maxheight="120"                                     ## //
// ## soundcloud-widget-show-comments="false"                               ## //
// ## soundcloud-widget-download="false"                                    ## //
// ## soundcloud-widget-buying="false"                                      ## //
// ## soundcloud-widget-linkig="false"                                      ## //
// ## soundcloud-widget-sharing="false"                                     ## //
// ## soundcloud-widget-show-playcount="false"                              ## //
// ## soundcloud-widget-show-user="false"                                   ## //
// ## soundcloud-callback-load-progress="functionLoadProgress()"            ## //
// ## soundcloud-callback-play-progress="functionPlayProgress()"            ## //
// ## soundcloud-callback-play="functionPlay()"                             ## //
// ## soundcloud-callback-pause="functionPause()"                           ## //
// ## soundcloud-callback-finish="functionFinish()"                         ## //
// ## soundcloud-callback-seek="functionSeek()"                             ## //
// ## soundcloud-callback-ready="functionReady()"                           ## //
// ## soundcloud-callback-click-download="functionClickDownload()"          ## //
// ## soundcloud-callback-click-buy="functionClickBuy()"                    ## //
// ## soundcloud-callback-open-share-panel="functionOpenSharePanel()"       ## //
// ## soundcloud-callback-error="functionError()"                           ## //
// ##                                                                       ## //
// ## EXAMPLE                                                               ## //
// ##                                                                       ## //
// ## Add scripts:                                                          ## //
// ## <script src="http://connect.soundcloud.com/sdk.js"></script>          ## //
// ## <script src="https://w.soundcloud.com/player/api.js"></script>        ## //
// ## <script>                                                              ## //
// ##     SC.initialize({                                                   ## //
// ##        client_id: 'YOUR_CLIENTE_ID'                                   ## //
// ##     });                                                               ## //
// ## </script>                                                             ## //
// ##                                                                       ## //
// ##                                                                       ## //
// ## <a href="[[ item.url ]]" soundcloud="[[ item.url ]]" soundcloud-widget-id="my-sc-widget" soundcloud-widget-auto-play="true" soundcloud-widget-maxheight="120" soundcloud-widget-show-comments="false" soundcloud-widget-download="false" soundcloud-widget-buying="false" soundcloud-widget-linkig="false" soundcloud-widget-sharing="false" soundcloud-widget-show-playcount="false" soundcloud-widget-show-user="false" soundcloud-callback-finish="notifyFinishedContent(item.id)"></a> ## //
// ##                                                                       ## //
// ########################################################################### //
// ########################################################################### //
define(
    [
        'app'
    ],
    function(app) {
        app
            .lazy
            .directive('soundcloud', function($compile) {
                return {
                    restrict: 'A',
                    scope: {
                        soundcloudCallbackLoadProgress:'&soundcloudCallbackLoadProgress',
                        soundcloudCallbackPlayProgress:'&soundcloudCallbackPlayProgress',
                        soundcloudCallbackPlay:'&soundcloudCallbackPlay',
                        soundcloudCallbackPause:'&soundcloudCallbackPause',
                        soundcloudCallbackFinish:'&soundcloudCallbackFinish',
                        soundcloudCallbackSeek:'&soundcloudCallbackSeek',
                        soundcloudCallbackReady:'&soundcloudCallbackReady',
                        soundcloudCallbackClickDownload:'&soundcloudCallbackClickDownload',
                        soundcloudCallbackClickBuy:'&soundcloudCallbackClickBuy',
                        soundcloudCallbackOpenSharePanel:'&soundcloudCallbackOpenSharePanel',
                        soundcloudCallbackError:'&soundcloudCallbackError',
                    },
                    transclude: true,
                    link: function(scope, elem, attrs) {
                        var soundcloudCallbackLoadProgress = scope.soundcloudCallbackLoadProgress;
                        var soundcloudCallbackPlayProgress = scope.soundcloudCallbackPlayProgress;
                        var soundcloudCallbackPlay = scope.soundcloudCallbackPlay;
                        var soundcloudCallbackPause = scope.soundcloudCallbackPause;
                        var soundcloudCallbackFinish = scope.soundcloudCallbackFinish;
                        var soundcloudCallbackSeek = scope.soundcloudCallbackSeek;
                        var soundcloudCallbackReady = scope.soundcloudCallbackReady;
                        var soundcloudCallbackClickDownload = scope.soundcloudCallbackClickDownload;
                        var soundcloudCallbackClickBuy = scope.soundcloudCallbackClickBuy;
                        var soundcloudCallbackOpenSharePanel = scope.soundcloudCallbackOpenSharePanel;
                        var soundcloudCallbackError = scope.soundcloudCallbackError;

                        SC.oEmbed(
                            attrs.soundcloud,
                            {
                                auto_play: attrs.soundcloudWidgetAutoPlay || false,
                                maxheight: attrs.soundcloudWidgetMaxheight || 166,
                                show_comments: attrs.soundcloudWidgetShowComments || true,
                                download: attrs.soundcloudWidgetDownload || true,
                                buying: attrs.soundcloudWidgetBuying || true,
                                liking: attrs.soundcloudWidgetLinkig || true,
                                sharing: attrs.soundcloudWidgetSharing || true,
                                show_playcount: attrs.soundcloudWidgetShowPlaycount || true,
                                show_user: attrs.soundcloudWidgetShowUser || true,
                            },
                            function(oEmbed) {
                                var html = $('<div>' + oEmbed.html + '</div>');
                                html.find('iframe').attr('id', attrs.soundcloudWidgetId);

                                elem.replaceWith(
                                    $compile(html.html())(scope)
                                );

                                var widget = SC.Widget(document.getElementById(attrs.soundcloudWidgetId));

                                if(attrs.soundcloudCallbackLoadProgress) {
                                    widget.bind(SC.Widget.Events.LOAD_PROGRESS, function(e){
                                        if(typeof soundcloudCallbackLoadProgress !== 'undefined') {
                                            soundcloudCallbackLoadProgress();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackPlayProgress) {
                                    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(e){
                                        if(typeof soundcloudCallbackPlayProgress !== 'undefined') {
                                            soundcloudCallbackPlayProgress();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackPlay) {
                                    widget.bind(SC.Widget.Events.PLAY, function(e){
                                        if(typeof soundcloudCallbackPlay !== 'undefined') {
                                            soundcloudCallbackPlay();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackPause) {
                                    widget.bind(SC.Widget.Events.PAUSE, function(e){
                                        if(typeof soundcloudCallbackPause !== 'undefined') {
                                            soundcloudCallbackPause();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackFinish) {
                                    widget.bind(SC.Widget.Events.FINISH, function(e){
                                        if(typeof soundcloudCallbackFinish !== 'undefined') {
                                            soundcloudCallbackFinish();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackSeek) {
                                    widget.bind(SC.Widget.Events.SEEK, function(e){
                                        if(typeof soundcloudCallbackSeek !== 'undefined') {
                                            soundcloudCallbackSeek();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackReady) {
                                    widget.bind(SC.Widget.Events.READY, function(e){
                                        if(typeof soundcloudCallbackReady !== 'undefined') {
                                            soundcloudCallbackReady();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackClickDownload) {
                                    widget.bind(SC.Widget.Events.CLICK_DOWNLOAD, function(e){
                                        if(typeof soundcloudCallbackClickDownload !== 'undefined') {
                                            soundcloudCallbackClickDownload();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackClickBuy) {
                                    widget.bind(SC.Widget.Events.CLICK_BUY, function(e){
                                        if(typeof soundcloudCallbackClickBuy !== 'undefined') {
                                            soundcloudCallbackClickBuy();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackOpenSharePanel) {
                                    widget.bind(SC.Widget.Events.OPEN_SHARE_PANEL, function(e){
                                        if(typeof soundcloudCallbackOpenSharePanel !== 'undefined') {
                                            soundcloudCallbackOpenSharePanel();
                                        }
                                    });
                                }

                                if(attrs.soundcloudCallbackError) {
                                    widget.bind(SC.Widget.Events.ERROR, function(e){
                                        if(typeof soundcloudCallbackError !== 'undefined') {
                                            soundcloudCallbackError();
                                        }
                                    });
                                }
                            }
                        );
                    }
               };
            });
    }
);

!function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "jquery.form.min", "jquery.mask.min"], t) : t("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function (t) {
    "use strict";
    var e = "", o = {}, i = {
        init: function () {
            t(document).on("focus", "[data-bf-mask]", function () {
                i.set(t(this))
            }), t("[data-bf-mask]").each(function () {
                i.set(t(this))
            })
        }, set: function (t) {
            $('input[name="phone"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
            $('input[name="phone"]').on('click', function() {
                $(this).setCursorPosition(4);
            })
            $.fn.setCursorPosition = function(pos) {
                this.each(function(index, elem) {
                    if (elem.setSelectionRange) {
                        elem.setSelectionRange(pos, pos);
                    } else if (elem.createTextRange) {
                        var range = elem.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', pos);
                        range.moveStart('character', pos);
                        range.select();
                    }
                });
                return this;
            };

            e = t.data("bf-mask"), o = t.attr("placeholder"), e.length > 0 && ((void 0 === o || o.length < 1) && (o = e.replace(/[a-z0-9]+?/gi, "_")), o = {placeholder: o}, t.mask(e, o))
        }
    }, n = {
        init: function (e, o) {
            if (o.length > 0) n.set({el: e, err_msg: o}), t(window).on("resize", {el: e, err_msg: o}, n.set); else {
                var i = e.attr("name");
                i && t('[data-bf-tooltip-id="' + i + '"]').remove()
            }
        }, set: function (e) {
            var o, i;
            e.data ? (o = e.data.el, i = e.data.err_msg) : (o = e.el, i = e.err_msg);
            var f = o.attr("name"), a = (o = t('[name="' + f + '"]:first', o.parents("form"))).attr("data-bf-tooltip");
            a = void 0 !== a ? a.replace(/[ ]+?/gi, "-") : void 0 === (a = o.parents("form").attr("data-bf-tooltip")) ? "right-center" : a.replace(/[ ]+?/gi, "-"), t('[data-bf-tooltip-id="' + f + '"]').remove(), o.after('<div class="bf-tooltip bf-tooltip-' + a + '" data-bf-tooltip-id="' + f + '">                          <div class="bf-arrow"></div>' + i + "</div>"), n.position(o)
        }, reset: function () {
            t(window).off("resize", n.set), t(".bf-tooltip").remove()
        }, response: function (e, o, i, n, f, a) {
            var r = e + o + i, s = t(window).outerWidth() - i - o;
            return r > t(window).outerWidth() && (e = s), s <= n.left && (e = n.left, a.width(f - i)), e
        }, position: function (e) {
            var o = e.offset();
            if (void 0 !== o) {
                var i, f = e.outerHeight(), a = e.outerWidth(), r = e.attr("name"),
                    s = t('[data-bf-tooltip-id="' + r + '"]'), l = s.outerWidth(), c = s.outerHeight();
                if (void 0 === (i = e.attr("data-bf-tooltip"))) void 0 === (i = e.parents("form").attr("data-bf-tooltip")) && (i = "right center");
                if ("top right" == i) {
                    var d = o.left + a / 6 * 5;
                    d = n.response(d, l, 20, o, a, s), s.offset({top: o.top - c, left: d})
                } else if ("top center" == i) {
                    d = o.left + a / 2;
                    d = n.response(d, l, 20, o, a, s), s.offset({top: o.top - c, left: d})
                } else if ("top" == i) {
                    d = o.left;
                    d = n.response(d, l, 20, o, a, s), s.offset({top: o.top - c, left: d})
                } else if ("top left" == i) {
                    d = o.left - a / 6 * 5;
                    s.offset({top: o.top - c, left: d})
                } else if ("left center" == i) {
                    d = o.left - l;
                    s.offset({top: o.top + f / 2 - c / 2, left: d})
                } else if ("bottom" == i) {
                    d = o.left;
                    d = n.response(d, l, 20, o, a, s), s.offset({top: o.top + f, left: d})
                } else if ("bottom left" == i) {
                    d = o.left - a / 6 * 5;
                    s.offset({top: o.top + f, left: d})
                } else if ("bottom center" == i) {
                    d = o.left + a / 2;
                    d = n.response(d, l, 20, o, a, s), s.offset({top: o.top + f, left: d})
                } else if ("bottom right" == i) {
                    d = o.left + a / 6 * 5;
                    d = n.response(d, l, 20, o, a, s), s.offset({top: o.top + f, left: d})
                } else if ("right center" == i) {
                    d = o.left + a;
                    s.offset({top: o.top + f / 2 - c / 2, left: d})
                }
            }
        }
    }, f = {
        server: function (e, o, i) {
            var a, r, l = 0;
            return n.reset(), o.mail_to ? (n.init(t(":focus", e), o.mail_to), !1) : (t.each(o, function (i, c) {
                a = "", "token" == i ? s.set_attr_form(e, o.token, "bf-token") : (a = f.set_err_msg(c), r = t('[name="' + i + '"]', e), n.init(r, a), a.length > 0 && (l = 1))
            }), !(parseInt(l) > 0))
        }, set_err_msg: function (e) {
            var o = "";
            return e.required ? o = e.required : e.rangelength ? o = e.rangelength : e.minlength ? o = e.minlength : e.maxlength ? o = e.maxlength : t.each(e, function (t, e) {
                if ("required" != t && "rangelength" != t && "minlength" != t && "maxlength" != t) return o = e, !1
            }), o
        }
    }, a = {
        init: function (e, o, i, n) {
            t.ajax({
                url: e, data: o, method: "post", dataType: "html", beforeSend: function (t) {
                    a.loader_on()
                }, success: function (e) {
                    a.set_overlay(), a.set_close_event(), t(".bf-modal, .bf-fixed-overlay").css("opacity", "0"), t(".bf-modal-box").html(e), a.loader_off(), t(".bf-modal, .bf-fixed-overlay").animate({opacity: "1"}, 400), i(n)
                }
            })
        }, set_overlay: function () {
            t(".bf-fixed-overlay").remove(), t("body").append('<div class="bf-fixed-overlay bf-fixed-overlay__modal">                             <div class="bf-modal">                                 <div class="bf-modal_container">                                     <a href="javascript:;" data-bf-popup="close" class="bf-modal-close" title=""></a>                                       <div class="bf-modal-box"></div>                                 </div>                             </div>                         </div>')
        }, loader_on: function () {
            t("body").append('<div class="bf-loading"></div>')
        }, loader_off: function () {
            t(".bf-loading").remove()
        }, set_close_event: function () {
            t(document).on("click", "[data-bf-popup='close'], .bf-fixed-overlay", function () {
                a.close()
            }), t(document).on("click", ".bf-modal", function (t) {
                t.stopImmediatePropagation()
            })
        }, close: function () {
            t(".bf-fixed-overlay").remove(), s.init_form()
        }
    }, r = {
        init: function () {
            r.update(), t(document).on("click", "img[data-bf-capcha]", function () {
                r.update()
            })
        }, update: function () {
            t("img[data-bf-capcha]").attr("src", s.path + "?type=capcha&u=" + Math.random())
        }
    }, s = {
        config: "", path: "/rockform/init.php", timer: function (t) {
            var e = 2e3, o = t.data("bf-timer");
            return void 0 !== o && parseInt(o) > 0 && (e = o), gtag('event', 'send', {
                'event_category': 'zayavka',
                'event_action': 'fill-form-2'
            }), console.log(e), e
        }, init: function () {
            s.init_form(), s.init_popup_form()
        }, init_popup_form: function () {
            t(document).on("click", "[data-bf-config]:not(form)", function (e) {
                e.preventDefault();
                var o = t(this).data("bf-config");
                (void 0 === o || o.length < 1) && (o = "");
                var i = s.get_custom_popup_attributes(t(this));
                a.init(s.path, {"bf-config": o, attributes: i, type: "form"}, s.init_form, {
                    config_popup: o,
                    attributes: i
                })
            })
        }, get_custom_popup_attributes: function (e) {
            var o = {}, i = "";
            return e.length && t.each(e[0].attributes, function (t, e) {
                i = e.name, /data\-bf\-field/.test(i) && (i = i.replace("data-bf-", ""), o[i] = e.value)
            }), o.field_page_h1 = t("h1").html(), o.field_page_link = document.location.href, o
        }, init_form: function (e) {
            r.init(), i.init(), n.reset(), t(document).on("change", '[type="file"]', function () {
                t(this).parent().find(".name-file").html(t(this).val())
            }), t(document).off("submit", "form[data-bf-config], .bf-modal form").on("submit", "form[data-bf-config], .bf-modal form", function (o) {
                o.preventDefault();
                var i = t(this);
                void 0 === e && ((e = {}).config_popup = ""), s.config = s.get_config(e.config_popup, i.data("bf-config"));
                var n = i.formToArray();
                t.each(n, function (t, e) {
                    "file" == e.type && (n[t].value = e.value.name)
                }), t.post(s.path, {fields: n, type: "validation", "bf-config": s.config}, function (n) {
                    s.set_attr_form(i, s.config, "bf-config"), f.server(i, n, o) && (void 0 !== e.attributes && t.each(e.attributes, function (t, e) {
                        s.set_attr_form(i, e, t)
                    }), i.ajaxSubmit({
                        beforeSubmit: function (t, e, o) {
                            console.log('up');
                        }, success: s.show_response, url: s.path, type: "post", dataType: "json"
                    })), t(".bf-attr").remove()
                })
            })
        }, set_attr_form: function (t, e, o) {
            t.prepend('<input name="' + o + '" class="bf-attr" type="hidden" value="' + e + '" />')
        }, get_config: function (t, e) {
            return void 0 === t || t.length < 1 ? (void 0 === e || e.length < 1) && (e = "") : e = t, e
        }, show_response: function (e, o, i, f) {
            e.status > 0 ? t.ajax({
                url: s.path,
                data: {type: "form_success", "bf-config": e["bf-config"]},
                method: "post",
                dataType: "html",
                beforeSend: function (t) {
                },
                success: function (e) {
                    f.hide(), f.find(".name-file").html("Прикрепить файл"), f.after(e), setTimeout(function () {
                        a.close()
                    }, s.timer(f)), setTimeout(function () {
                        f.show(), f.clearForm(), t("[data-bf-success]").remove()
                    }, s.timer(f) + 1e3)
                }
            }) : n.init(t(":focus", f), e.value)
        }, set_success_template: function () {
        }
    };
    s.init()
});
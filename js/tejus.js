'use strict';
(function($) {

    // TODO make this better

    var initContact = function() {
        if (!$('#contactForm').length) {
            return;
        }
        var emailTejus = 'geral';
        var emailAt = '@';
        var emailDom = 'tejus.pt';
        emailTejus += emailAt + emailDom;

        var successContact = function() {
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<strong>O seu contacto foi enviado com sucesso.</strong><br>Iremos contactá-lo brevemente!");
            $('#success > .alert-success')
                .append('</div>');

            //clear all fields
            $('#contactForm').trigger("reset");
        };

        $("input,textarea").jqBootstrapValidation({
            preventSubmit: true,
            /*
             submitError: function($form, event, errors) {
             // something to have when submit produces an error ?
             // Not decided if I need it yet
             },
             */
            submitSuccess: function($form, event) {
                event.preventDefault(); // prevent default submit behaviour
                // get values from FORM
                var name = $("input#name").val();
                var company = $("input#company").val();
                var phone = $("input#phone").val();
                var email = $("input#email").val();
                var message = $("textarea#message").val();
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }
                $.ajax({
                    url: "https://docs.google.com/forms/d/10uZIm9U-4Ax3UPGKabyJ9I6_cTH5lFmtDk9O6a-6A5Y/formResponse",
                    type: "POST",
                    data: {
                        'entry.1394112170': name,
                        'entry.1217269018': company,
                        'entry.242486221': phone,
                        'entry.591873960': email,
                        'entry.1795928166': message
                    },
                    dataType: 'xml',
                    crossDomain: true,
                    cache: false,
                    success: successContact,
                    error: function(jqXHR) {

                        if (jqXHR.status === 0) {
                            successContact();
                            return;
                        }

                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>" + firstName + " por motivos técnicos não foi possível submeter o seu formulário.</strong><br> Por favor contacte-nos através do email <a href='mail" + "to:" + emailTejus + "?Subject=Pedido de contacto;'>" + emailTejus + "</a>. Lamentamos o incómodo.");
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                })
            },
            filter: function() {
                return $(this).is(":visible");
            }
        });

        $("a[data-toggle=\"tab\"]").click(function(e) {
            e.preventDefault();
            $(this).tab("show");
        });

        /*When clicking on Full hide fail/success boxes */
        $('#name').focus(function() {
            'use strict';

            $('#success').html('');
        });
    };

    var initNewsletter = function() {

        if (!$('#newsletter-form').length) {
            return;
        }

        $.ajaxChimp.translations.pt = {
            'submit': 'A enviar...',
            0: 'Enviámos um email de confirmação.',
            1: 'Por favor introduza um valor.',
            2: 'Um endereço de email deve conter uma @.',
            3: 'O domínio do email é inválido.',
            4: 'O destinatário do email é inválido.',
            5: 'Este endereço de email aparenta ser falso ou inválido. Por favor introduza um email real.'
        };

        var $form = $('#newsletter-form');
        $form.ajaxChimp({
            language: 'pt'
        });
    };


    $(function() {
        $(".fancybox").fancybox();

        initNewsletter();
        initContact();
    });

})(jQuery);

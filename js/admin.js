$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // Mostra modal
    $(".add-new").click(function () {
        $("#addUserModal").modal('show');
    });

    // Salva user con tasto salva
    $("#saveUserBtn").click(function () {
        var form = $("#userForm");
        if (form[0].checkValidity()) {
            var user = {
                nome: $("#nome").val(),
                cognome: $("#cognome").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                eta: $("#eta").val(),
                peso: $("#peso").val(),
                altezza: $("#altezza").val(),
                ruolo: $("#ruolo").val(),
            };

            var newRow = '<tr>' +
                '<td>' + user.nome + '</td>' +
                '<td>' + user.cognome + '</td>' +
                '<td>' + user.email + '</td>' +
                '<td>' + user.password + '</td>' +
                '<td>' + user.eta + '</td>' +
                '<td>' + user.peso + '</td>' +
                '<td>' + user.altezza + '</td>' +
                '<td>' + user.ruolo + '</td>' +
                '<td>' +
                '<a class="add" title="Visualizza" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
                '<a class="edit" title="Modifica" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="delete" title="Elimina" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
                '</td>' +
                '</tr>';

            $("table tbody").append(newRow);
            $("#addUserModal").modal('hide');
            form[0].reset();
        } else {
            form.addClass('was-validated');
        }
    });

    // Edit row
    $(document).on("click", ".edit", function () {
        var $row = $(this).closest("tr");
        var $tds = $row.find("td").not(":last");
        $tds.each(function () {
            var html = $(this).html();
            $(this).html('<input type="text" class="form-control" value="' + html + '">');
        });
        $(this).toggleClass("edit confirm").html('<i class="bi bi-check"></i>');
        $(this).siblings(".delete").toggleClass("delete edit-cancel").html('<i class="bi bi-x"></i>');
    });

    // Conferma modifica con tasto conferma
    $(document).on("click", ".confirm", function () {
        var $row = $(this).closest("tr");
        $row.find("input").each(function () {
            var val = $(this).val();
            $(this).parent().text(val);
        });
        $(this).toggleClass("confirm edit").html('<i class="material-icons">&#xE254;</i>');
        $(this).siblings(".edit-cancel").toggleClass("edit-cancel delete").html('<i class="material-icons">&#xE872;</i>');
    });

    // Annulla modifica
    $(document).on("click", ".edit-cancel", function () {
        var $row = $(this).closest("tr");
        $row.find("input").each(function () {
            var val = $(this).val();
            $(this).parent().text(val);
        });
        $(this).toggleClass("edit-cancel delete").html('<i class="material-icons">&#xE872;</i>');
        $(this).siblings(".confirm").toggleClass("edit confirm").html('<i class="material-icons">&#xE254;</i>');
    });

    // Elimina utente
    $(document).on("click", ".delete", function () {
        if (confirm("Sei sicuro di voler eliminare questo utente?")) {
            $(this).closest("tr").remove();
        }
    });
});
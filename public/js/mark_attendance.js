$(document).ready(function () {
    $("button.btn-success").click(function () {
        if ($(this).text() === "Present") {
            $(this).text("Marked");
            $(this).removeClass("btn-success").addClass("btn-secondary");
            $(this).closest("tr").find("button.btn-danger").prop("disabled", true);
        } else {
            $(this).text("Present");
            $(this).removeClass("btn-secondary").addClass("btn-success");
            $(this).closest("tr").find("button.btn-danger").prop("disabled", false);
        }
    });

    $("button.btn-danger").click(function () {
        if ($(this).text() === "Absent") {
            $(this).text("Marked");
            $(this).removeClass("btn-danger").addClass("btn-secondary");
            $(this).closest("tr").find("button.btn-success").prop("disabled", true);
        } else {
            $(this).text("Absent");
            $(this).removeClass("btn-secondary").addClass("btn-danger");
            $(this).closest("tr").find("button.btn-success").prop("disabled", false);
        }
    });
});

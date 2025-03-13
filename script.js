function populate_soln_table(table_json) {
  let headers = table_json["headers"];
  let table_data = table_json["data"];
  $("#soln-table-json")
    .empty()
    .append(`<thead class="thead-dark"><tr></tr></thead>`);
  $.each(headers, (index, value) => {
    $("#soln-table-json thead tr").append(`<th>${value}</th>`);
  });
  $.each(table_data, (_, row_data) => {
    $("#soln-table-json").append(`<tbody></tbody>`).append(`<tr></tr>`);
    $.each(row_data, (_, cell_value) => {
      $("#soln-table-json tbody tr:last").append(`<td>${cell_value}</td>`);
    });
  });
}

function populate_soln_grid(data) {
  $("#soln-grid")
    .empty()
    .append("<tbody><tr></tr><tr></tr><tr></tr><tr></tr></tbody>");

  let M = data["category-keys"].length;
  let N = data["categories"][data["category-keys"][0]].length;

  $("#soln-grid tbody tr:nth-of-type(1)").append(
    `<td class="no-border right-border bottom-border" colspan=4 rowspan=4></td><td class="gridlineh" colspan=${
      M + N * (M - 1)
    }></td>`
  );
  $("#soln-grid tbody tr:nth-of-type(2)").append(
    '<td class="gridlinev"></td></td>'
  );
  $.each(data["category-keys"].slice(1), (_, category) => {
    $("#soln-grid tbody tr:nth-of-type(2)")
      .first()
      .append(
        `<th class="has-border bg-primary text-light gridheaderh" colspan="${N}">${category}</th><td class="gridlinev"></td>`
      );
  });
  $("#soln-grid tbody tr:nth-of-type(3)").append(
    `<td class="gridlineh" colspan=${M + N * (M - 1)}></td>`
  );

  $("#soln-grid tbody tr:last").append('<td class="gridlinev"></td></td>');
  $.each(data["category-keys"].slice(1), (_, category) => {
    var row_data = data["categories"][category];
    $.each(row_data, (j, value) => {
      $("#soln-grid tbody tr:last").append(
        `<th class="has-border">${vertical_text(value)}</th>`
      );
      if (j == row_data.length - 1) {
        $("#soln-grid tbody tr:last").append(`<td class="gridlinev"></td>`);
      }
    });
  });
  $("#soln-grid tbody").append(
    `<tr><td class="gridlineh" colspan=${4 + M + N * (M - 1)}></td></tr>`
  );

  let flat_pretty = data["pretty"]
    .replaceAll("🟥", "0")
    .replaceAll("🟩", "1")
    .replaceAll(" ", "")
    .replaceAll("\n", "");
  $.each(data["categories"][data["category-keys"][0]], (i, value) => {
    $("#soln-grid tbody").append("<tr></tr>");
    if (i == 0) {
      $("#soln-grid tbody tr:last").append(
        `<td class="gridlinev" rowspan=${N}></td><th class="has-border bg-primary text-light gridheaderv" rowspan="${N}">${vertical_text(
          data["category-keys"][0],
          "text-white anchor-center",
          50
        )}</th><td class="gridlinev" rowspan=${N}></td>`
      );
    }
    $("#soln-grid tbody tr:last").append(
      `<th class="has-border labelboxh">${value}</th><td class="gridlinev"></td>`
    );
    $.each(Array.apply(null, Array(N * (M - 1))), (j, value) => {
      var val = flat_pretty[i * N * (M - 1) + j];
      var char = val == 1 ? "🟢" : val == 0 ? "❌" : "?";
      $("#soln-grid tbody tr:last").append(
        `<td class="has-border gridcell">${char}</td>`
      );
      if (j % N == N - 1) {
        $("#soln-grid tbody tr:last").append(`<td class="gridlinev"></td>`);
      }
    });
  });
  $("#soln-grid tbody").append(
    `<tr><td class="gridlineh" colspan=${4 + M + N * (M - 1)}></td></tr>`
  );
}

function vertical_text(value, text_class = "", y_offset = 0) {
  return `<svg
            height="125"
            version="1.1"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            style="overflow: hidden; position: relative; left: -0.5px;"
          >
            <text
              class="vertical-text ${text_class}"
              x="${-32 + y_offset}"
              y="90"
              transform="matrix(0,-1,1,0,-71,88)"
            >
            <tspan>${value}</tspan>
          </text>
        </svg>`;
}

function populate_solution(data) {
  $("#soln-table-text").html(data["table-text"]);
  $("#soln-submit").html(
    data["pretty"].replaceAll("🟥", "❌").replaceAll("🟩", "🟢")
  );
  $("#soln-url").html(data["url"]);
  $("#soln-url").attr("href", data["url"]);
  populate_soln_table(data["table-json"]);
  populate_soln_grid(data);
}

const initial_data = {
  gridary: {
    A1B1: 1, A1B2: 1, A1B3: 1, A1B4: 1, A1B5: 9, A1C1: 1, A1C2: 9, A1C3: 1, A1C4: 1, A1C5: 1, A1D1: 9, A1D2: 1, A1D3: 1, A1D4: 1, A1D5: 1, A2B1: 1, A2B2: 1, A2B3: 1, A2B4: 9, A2B5: 1, A2C1: 1, A2C2: 1, A2C3: 1, A2C4: 1, A2C5: 9, A2D1: 1, A2D2: 1, A2D3: 1, A2D4: 9, A2D5: 1, A3B1: 9, A3B2: 1, A3B3: 1, A3B4: 1, A3B5: 1, A3C1: 9, A3C2: 1, A3C3: 1, A3C4: 1, A3C5: 1, A3D1: 1, A3D2: 1, A3D3: 1, A3D4: 1, A3D5: 9, A4B1: 1, A4B2: 9, A4B3: 1, A4B4: 1, A4B5: 1, A4C1: 1, A4C2: 1, A4C3: 1, A4C4: 9, A4C5: 1, A4D1: 1, A4D2: 1, A4D3: 9, A4D4: 1, A4D5: 1, A5B1: 1, A5B2: 1, A5B3: 9, A5B4: 1, A5B5: 1, A5C1: 1, A5C2: 1, A5C3: 9, A5C4: 1, A5C5: 1, A5D1: 1, A5D2: 9, A5D3: 1, A5D4: 1, A5D5: 1,
  },
  gridstate:
    "999919991919999919999919991999999911999999919991991999999919999919919991999",
  pretty:
    "🟥🟥🟥🟥🟩 🟥🟩🟥🟥🟥 🟩🟥🟥🟥🟥 \n🟥🟥🟥🟩🟥 🟥🟥🟥🟥🟩 🟥🟥🟥🟩🟥 \n🟩🟥🟥🟥🟥 🟩🟥🟥🟥🟥 🟥🟥🟥🟥🟩 \n🟥🟩🟥🟥🟥 🟥🟥🟥🟩🟥 🟥🟥🟩🟥🟥 \n🟥🟥🟩🟥🟥 🟥🟥🟩🟥🟥 🟥🟩🟥🟥🟥 ",
  "table-json": {
    data: [
      ["January", "Wendell", "Faith", "Belize"],
      ["February", "Noel", "Velma", "Nepal"],
      ["March", "Horace", "Amelia", "Vietnam"],
      ["April", "Jacob", "Naomi", "Mongolia"],
      ["May", "Leon", "Ida", "Jordan"],
    ],
    headers: ["Months", "Chiroptologists", "Speleologists", "Countries"],
  },
  "table-text":
    "Months     Chiroptologists   Speleologists   Countries  \n---------- ----------------- --------------- -----------\nJanuary    Wendell           Faith           Belize     \nFebruary   Noel              Velma           Nepal      \nMarch      Horace            Amelia          Vietnam    \nApril      Jacob             Naomi           Mongolia   \nMay        Leon              Ida             Jordan     ",
  url: "https://logic.puzzlebaron.com/play.php?u2=33d066d4fd08efb3b69c0f4f6f516a80",
  categories: {
    Chiroptologists: ["Horace", "Jacob", "Leon", "Noel", "Wendell"],
    Countries: ["Belize", "Jordan", "Mongolia", "Nepal", "Vietnam"],
    Months: ["January", "February", "March", "April", "May"],
    Speleologists: ["Amelia", "Faith", "Ida", "Naomi", "Velma"],
  },
  "category-keys": ["Months", "Chiroptologists", "Speleologists", "Countries"],
};

$(document).ready(function () {
  $.ajax({
    url: "components/navbar.html",
    cache: false,
    dataType: "html",
    success: function (data) {
      $("#navbar").html(data);
    },
  });

  $("#puzzleInfo").on("submit", function (e) {
    $("#submit-url")
      .empty()
      .append(
        `<div class="spinner-border text-light spinner-border-sm" role="status"></div>`
      )
      .prop("disabled", true);

    e.preventDefault();
    var form = $(this);
    // var serverEndpoint = "http://127.0.0.1:5000/solve_url"; // Local flask app: `flask run`
    var serverEndpoint =
      "https://mectbrdh6g.execute-api.us-east-1.amazonaws.com/logic-puzzle-solver"; // AWS Lambda / API Gateway
    var url = form.find('input[name="url"]').val();

    $.ajax({
      url: serverEndpoint,
      type: "GET",
      data: form.serialize(),
      success: function (data, textStatus, jqXHR) {
        $("#submit-url").empty().text(`Solve`).prop("disabled", false);
        if (textStatus === "success") {
          populate_solution(data);
        } else {
          alert(`Unsuccessful: ${data} ${textStatus} ${jqXHR}`);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#submit-url").empty().text(`Solve`).prop("disabled", false);
        alert(
          `Error: ${jqXHR.statusText} ${jqXHR.status} ${jqXHR.responseText} ${textStatus} ${errorThrown}`
        );
      },
    });
  });

  populate_solution(initial_data);
});

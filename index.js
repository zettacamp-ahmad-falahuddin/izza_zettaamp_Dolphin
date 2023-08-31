let books = [
    {
        name: "Pulang",
        totalCount: 5,
        author: "Izza",
    },
    {
        name: "Pulang",
        totalCount: 5,
        author: "Izza",
    },
    {
        name: "Pulang",
        totalCount: 5,
        author: "Izza",
    },
]

localStorage.setItem("userData", JSON.stringify(books))

function bindUserData() {
    var books = JSON.parse(localStorage.getItem('userData'));
    if (books != null) {
        document.getElementById('tblbody').innerHTML = "";
        books.forEach(function (item, index) {
            debugger;
            var btnEditName = "btnedit" + item.name;
            var btnDeleteName = "btndelete" + item.name;
            var tableRow = "<tr Id='" + item.name + "'>"
                + "<td class='td-data'>" + item.name + "</td>"
                + "<td class='td-data'>" + item.totalCount + "</td>"
                + "<td class='td-data'>" + item.author + "</td>"
                + "<td class='td-data'>" +
                "<button id='" + btnEditName + "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" + item.name + ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
                "<button id='" + btnDeleteName + "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(" + item.name + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
                + "</td>"
                + "</tr>";
            document.getElementById('tblbody').innerHTML += tableRow;
        })
    }
    var AddRow = "<tr>"
        + "<td class='td-data'><input type='text' id='txtname' placeholder='name..'></td>"
        + "<td class='td-data'><input type='number' id='txttotalCount' placeholder='number..'></td>"
        + "<td class='td-data'><input type='text' id='txtauthor' placeholder='name..'></td>"
        + "<td class='td-data'>" + "<button id= 'btnaddCustomer' onclick='addUser()' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>" + "</td>"
        + "</tr>";
    document.getElementById('tblbody').innerHTML += AddRow;
}

console.log('izza');
bindUserData();

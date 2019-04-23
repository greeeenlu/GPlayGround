Vue.config.devtools = true;


var app = new Vue({
    el: "#app",
    data: {
        employees: emloyees,
        employee: {},
        newEmployee: {}
    },
    methods: {
        Create: function () {
            console.log("hello");
            axios({
                method: 'post',
                url: '/Employees/Create',
                data: {
                    name: this.newEmployee.name,
                    birthday: this.newEmployee.birthday,
                    age: this.newEmployee.age,
                    address: this.newEmployee.address,
                    phone: this.newEmployee.phone
                }
            }).then(function (response) {
                console.log(response);
                window.location.reload();
            }).catch(function (error) {
                    console.log(error);
                });
        },
        Edit: function (employee) {
            this.employee = employee;
        },
        Update: function () {
            axios({
                method: 'post',
                url: '/Employees/Edit',
                data: {
                    employeeId: this.employee.employeeId,
                    name: this.employee.name,
                    birthday: this.employee.birthday,
                    age: this.employee.age,
                    address: this.employee.address,
                    phone: this.employee.phone
                }
            }).then(function (response) {
                console.log(response);
                window.location.reload();

            }).catch(function (error) {
                    console.log(error);
                });
        },
        Delete: function (employeeId) {
            console.log(employeeId);
            axios({
                method: 'post',
                url: '/Employees/Delete?id=' + employeeId,

            }).then(function (response) {
                console.log(response);
                window.location.reload();
            }).catch(function (error) {
                    console.log(error);
                });
        },
        DateFormat: function(date) {
            return moment(date, )
        }
    }
});
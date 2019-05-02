Vue.config.devtools = true;


var app = new Vue({
    el: "#app",
    data: {
        employees: emloyees,
        employee: {},
        newEmployee: {},
        errors: [],
    },
    methods: {
        Create: function () {
            if (!this.CheckForm(this.newEmployee)) {
                return;
            }
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
            this.employee.birthday = moment(employee.birthday).format('YYYY-MM-DD');
            this.errors = [];
        },
        Update: function () {
            if (!this.CheckForm(this.employee)) {
                return false;
            }
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
        CheckForm: function(employee) {
            this.errors = [];
            if (!employee.name) {
                this.errors.push("Name required.");
            }
            if (!employee.birthday) {
                this.errors.push("birthday required.");
            }
            if (!employee.age) {
                this.errors.push("age required.");
            }
            if (!employee.address) {
                this.errors.push("address required.");
            }

            if (!employee.phone) {
                this.errors.push('phone required.');
            } else if (!this.validatePhone(employee.phone)) {
                this.errors.push('Valid phone required.');
            }
            if (!this.errors.length) {
                return true;
            }
            return false;
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validatePhone: function(phone) {
            var re = /^09\d{2}-\d{6}$/;
            return re.test(phone);
        },
        validateBirthday: function (date) {
            var re = /^\d{4}\/\d{2}\/\d{2}$/ ;
            return re.test(date);
        }
    },
    filters: {
        DateFormat: function (date) {
            return moment(date).format('YYYY-MM-DD');
        }
    }
});
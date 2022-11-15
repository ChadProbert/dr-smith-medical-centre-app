let expect = require("chai").expect;
let request = require("request");

// tests to see if the frontend page returns a status code of 200 (success)
/* if this test fails it means that the client side page has crashed or has not been 
started using npm start in the frontend directory of the terminal */
describe("frontend status code response", function () {
	it("gives a success response", function (done) {
		request("http://localhost:3000/", function (error, response, body) {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});
});

// tests to see if the backend page returns a status code of 200 (success)
/* if this test fails it means that appointments will not be displayed to the 
on the admin dashboard. Ensure that the backend server has been started using 
npm start in the backend directory of the terminal */
describe("backend status code response", function () {
	it("gives a success response", function (done) {
		request(
			"http://localhost:5000/app/admin-appointments",
			function (error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			}
		);
	});
});

/* references: 
  My own work from Level 2 Task 21
  https://www.npmjs.com/package/chai
  https://www.npmjs.com/package/mocha
  https://www.npmjs.com/package/request

  */

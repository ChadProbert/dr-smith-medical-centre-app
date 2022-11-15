import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Homepage from "../components/Homepage";

it("Snapshot of Homepage", () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<Homepage />
			</MemoryRouter>
		)
		.toJSON();

	expect(tree).toMatchSnapshot();
});

/* references: 
  my own work from level 2 task 21
  https://www.youtube.com/watch?v=qOaGoujjc3M&ab_channel=SoftwareTestingHelp
  https://www.npmjs.com/package/react-test-renderer
  
  */

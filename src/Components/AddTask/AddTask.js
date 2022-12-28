import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";

const AddTask = () => {
  const [image, SetImage] = useState("");
  const [task, SetTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image, task);
  };

  return (
    <div className="mt-20 w-full md:w-11/12 mx-auto lg:w-1/2">
      <h1 className="text-3xl text-center font-bold">Add New Task</h1>

      <div className="mt-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="base" value="Add Photo" />
            </div>
            <TextInput
              onChange={(e) => SetImage(e.target.files[0])}
              id="base"
              type="file"
              sizing="md"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="large" value="Add Task" />
            </div>
            <input
              onChange={(e) => SetTask(e.target.value)}
              id="large"
              type="text"
              className="w-full h-36  text-2xl "
            />
          </div>

          <Button color="success" type="submit">
            {" "}
            submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

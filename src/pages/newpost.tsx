import { type NextPage } from "next";
// import { api } from "~/utils/api";

// const NewPost: NextPage = () => {
//   return <div className="flex w-full h-full justify-center items-center">
//     <p>NewPost</p>
//   </div>;
// };

// export default NewPost;


import * as React from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";


interface Inputs {
  [bookNookName: string]: string;
  bookTitle: string;
  genre: string;
  schedule: string;
  description: string;
}

export interface IAppProps {}

export default function NewPost(props: IAppProps) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      bookNookName: "",
      bookTitle: "",
      genre: "",
      schedule: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);


  return (
    <div className="flex w-full h-full justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" h-5/6 w-11/12 rounded-lg bg-violet-800  py-8 px-8 shadow-lg"
      >
        <div className="text-white mb-6 flex w-full justify-center">
          <h1 className="text-xl">Create a Book Nook</h1>
        </div>
        <FormInputs register={register} watch={watch} error={errors} />
        <div className="mb-6 flex w-full justify-center">
          <input
            type={"submit"}
            className="cursor-pointer rounded bg-slate-100 py-2 px-4  text-blue-600 hover:bg-black hover:text-white"
          ></input>
        </div>
      </form>
    </div>
  );
}

interface FormInputProps {
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
  error: FieldErrors<Inputs>;
}

const FormInputs = (props: FormInputProps) => {
  const formLabelEnum = [
    {
      placeHolder: "Book Nook Name",
      id: "bookNookName",
      error: "Please provide a valid book nook name",
    },
    {
      placeHolder: "Book Title",
      id: "bookTitle",
      error: "Please provide a valid book title",
    },
    {
      placeHolder: "Genre",
      id: "genre",
      error: "Please provide a valid genre",
    },
    {
      placeHolder: "Schedule",
      id: "schedule",
      error: "Please provide a valid schedule",
    },
    {
      placeHolder: "Description",
      id: "description",
      error: "Please provide a valid description",
    },
  ];

  return (
    <>
      {formLabelEnum.map((input) => {
        return (
          <div className="mb-6" key={input.id}>
            {input.id === "description" ? (
              <textarea
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id={input.id}
                placeholder={input.placeHolder}
                rows={3}
                style={{ resize: "none" }}
                {...props.register(`${input.id}`, { required: true })}
              ></textarea>
            ) : (
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id={input.id}
                type="text"
                placeholder={input.placeHolder}
                {...props.register(`${input.id}`, { required: true })}
              ></input>
            )}

            {props.error[`${input.id}`] && <p className="text-red-500">{input.error}</p>}
          </div>
        );
      })}
    </>
  );
};

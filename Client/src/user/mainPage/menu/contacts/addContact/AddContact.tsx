import { useState } from "react";
import { Core_api_Link, Media_api_Link } from "../../../../../consts/APILink";
import { User } from "../../../../../interfaces/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface Props {
  goBack: () => void;
  selectedContact: User;
}

const AddContact = ({ goBack, selectedContact }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();

  const addContactMutate = useMutation({
    mutationFn: async (data: { targetUserId: number }) => {
      const result = await fetch(Core_api_Link + `users/addContact`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: () => {
      setSubmitLoading(false);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      goBack();
    },
    onError: (error: any) => {
      setSubmitLoading(false);
      setError(error.message);
    },
  });

  const handleAdd = () => {
    setSubmitLoading(true);
    addContactMutate.mutate({ targetUserId: selectedContact.id });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="bg-base-200 shadow-lg rounded-lg w-full max-w-md p-6">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="btn btn-sm btn-outline mb-4 flex items-center"
        >
          <p className=" mr-1">B</p> 
        </button>

        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full bg-gray-200 bg-cover bg-center mb-4"
            style={{
              backgroundImage: selectedContact.profilePicture
                ? `url(${Media_api_Link}file/${selectedContact.profilePicture})`
                : "",
            }}
          >
            {!selectedContact.profilePicture && (
              <div className="h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary mb-2">
            {selectedContact.firstName} {selectedContact.lastName}
          </h2>
          <p className="text-gray-600 mb-4">{selectedContact.email}</p>

          {/* Form Submission */}
          <form
            onSubmit={
              submitLoading
                ? (e) => e.preventDefault()
                : handleSubmit(handleAdd)
            }
            className="space-y-4"
          >
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                submitLoading && "btn-disabled"
              }`}
            >
              {submitLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Add Contact"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;

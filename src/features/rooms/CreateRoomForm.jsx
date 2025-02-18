/* eslint-disable react/prop-types */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useUpdateRoom } from "../../hooks/useUpdateRoom";
import { useCreateRoom } from "../../hooks/useCreateRoom";

function CreateRoomForm({ room = {}, onCloseModal }) {
  const { id: editId, ...data } = room;

  const isEdit = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEdit ? data : {},
  });
  const { errors } = formState;

  const { createRoom, isLoading } = useCreateRoom();

  const { isEditing, updateRoom } = useUpdateRoom();

  const isWorking = isLoading || isEditing;
  function onSubmit(data) {
    if (!data) {
      return;
    }

    const image =
      typeof data.imageUrl === "string" ? data.imageUrl : data.imageUrl[0];
    if (isEdit) {
      updateRoom(
        { id: editId, ...data, imageUrl: image },
        {
          onSuccess: () => {
            onCloseModal?.(false);
          },
        }
      );
    } else {
      createRoom(
        { ...data, imageUrl: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.(false);
          },
        }
      );
    }
  }
  //   mutate({ ...data, imageUrl: data.imageUrl[0] });
  // }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Room name" error={errors.name}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Room name must be at least 3 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1 person",
            },
            max: {
              value: 6,
              message: "Capacity must be at most 6 people",
            },
          })}
        />
      </FormRow>
      <FormRow label="price" error={errors.price}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "This field is required",
            min: {
              value: 5000,
              message: "Price must be greater than Rs. 5000",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors.discount}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            min: {
              value: 0,
              message: "Discount cant be negative",
            },
            max: {
              value: 99,
              message: "Discount should be at most 99%",
            },
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors.description}>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Room photo">
        <FileInput
          id="imageUrl"
          accept="image/*"
          {...register("imageUrl", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.(false)}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isWorking ? "Loading..." : isEdit ? "Edit" : "Add"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;

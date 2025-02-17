import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "../../hooks/useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, error, settings } = useSettings();
  const { isEditing, updateSetting } = useUpdateSettings();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  if (isLoading) {
    return <Spinner />;
  }

  function handleUpdate(value, field) {
    if (!value) return;
    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isEditing}
          defaultValue={settings.miniBookingLength}
          onBlur={(e) => handleUpdate(e.target.value, "miniBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isEditing}
          defaultValue={settings.maxBookingLength}
          onBlur={(e) => handleUpdate(e.target.value, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isEditing}
          defaultValue={settings.maxGuests}
          onBlur={(e) => handleUpdate(e.target.value, "maxGuests")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isEditing}
          defaultValue={settings.breakfast_price}
          onBlur={(e) => handleUpdate(e.target.value, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

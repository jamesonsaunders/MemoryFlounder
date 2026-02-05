import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { create } from "zustand";
import {
    FormController,
    FormStoreProvider,
    getDefaultForm,
    getFormApi,
    withForm,
    type FormState
} from "zustorm";
import { useAppStore } from "./store";
import { type Form } from "./types";

export function Dashboard() {
  const navigate = useNavigate();

  // This store would return a new array for each call, causing maximum callstack exceeded.
  // So we return the length instead, which is a primitive and stable value
  const completedItems = useAppStore(
    (state) => state.items.filter((item) => item.completed).length
  );

  const totalItems = useAppStore((state) => state.items.length);

  const api = useMemo(() => getFormApi(useAppStore, "form"), []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate("/todos")}>Go to Todo List</button>
      <p>
        Completed {completedItems} out of {totalItems} items
      </p>

      <FormStoreProvider store={api}>
        <FormComponent />
      </FormStoreProvider>
    </div>
  );
}

const useForm = create<FormState<Form>>()(
  withForm(
    () =>
      getDefaultForm<Form>({
        friends: [],
        address: { street: "", city: "", zip: "" },
        name: "bob",
        email: "bob@example.com",
      }),
    {
      getSchema: () =>
        z.object({
          friends: z.array(
            z.object({
              name: z.string().min(1, "Name is required"),
              email: z.string().email("Invalid email address"),
            })
          ),
          address: z.object({
            street: z.string().min(1, "Street is required"),
            city: z.string().min(1, "City is required"),
            zip: z.string().min(1, "ZIP is required"),
          }),
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email address"),
        }),
    }
  )
);

function FormComponent() {

    const values = useForm((state) => state.values);
  return (
    <>
      <FormController
        store={useForm}
        name="name"
        render={(props) => (
          <div>
            <label>
              Name:
              <input
                value={props.value}
                onChange={(e) => {
                  props.onChange(e.target.value);
                }}
              />
            </label>
            {props.error && (
              <span style={{ color: "red" }}>{props.error._errors?.[0]}</span>
            )}
          </div>
        )}
      />
      <FormController
        store={useForm}
        name="email"
        render={(props) => (
          <div>
            <label>
              Email:
              <input
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
              />
            </label>
          </div>
        )}
      />
      <h2>Address</h2>
      <FormController
        store={useForm}
        name="address.street"
        render={(props) => (
          <div>
            <label>
              Street:
              <input
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
              />
            </label>
          </div>
        )}
      />
      <FormController
        store={useForm}
        name="address.city"
        render={(props) => (
          <div>
            <label>
              City:
              <input
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
              />
            </label>
          </div>
        )}
      />
      <FormController
        store={useForm}
        name="address.zip"
        render={(props) => (
          <div>
            <label>
              ZIP:
              <input
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
              />
            </label>
          </div>
        )}
      />
      <h2>Friends</h2>
      <FormController
        store={useForm}
        name="friends"
        render={(props) => (
          <div>
            {props.value.map((_, index) => (
              <div
                key={index}
                style={{ border: "1px solid black", marginBottom: 10 }}
              >
                <FormController
                  store={useForm}
                  name={`friends.${index}.name`}
                  render={(friendNameProps) => (
                    <div>
                      <label>
                        Name:
                        <input
                          value={friendNameProps.value}
                          onChange={(e) =>
                            friendNameProps.onChange(e.target.value)
                          }
                        />
                      </label>
                    </div>
                  )}
                />
                <FormController
                  store={useForm}
                  name={`friends.${index}.email`}
                  render={(friendEmailProps) => (
                    <div>
                      <label>
                        Email:
                        <input
                          value={friendEmailProps.value}
                          onChange={(e) =>
                            friendEmailProps.onChange(e.target.value)
                          }
                        />
                      </label>
                    </div>
                  )}
                />
                <button
                  onClick={() => {
                    const newFriends = props.value.filter(
                      (_, i) => i !== index
                    );
                    props.onChange(newFriends);
                  }}
                >
                  Remove Friend
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                props.onChange([...props.value, { name: "", email: "" }])
              }
            >
              Add Friend
            </button>
          </div>
        )}
      />
      {JSON.stringify(values, null, 2)}
    </>

  );
}

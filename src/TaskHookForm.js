import React from "react";
import { useForm } from "react-hook-form";
import "./app.css";
import { nanoid } from "nanoid";
import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { id: nanoid(5), title: "", description: "", people: [] },
  });
  const submitHandler = (data, e) => {
    submitFn({ ...data, id: nanoid(5), status: "yapılacak" });
    e.target.reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(submitHandler)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required: "Lütfen başlık yazınız.",
            minLength: {
              value: 3,
              message: "Task başlık alanı en az 3 harften oluşmalıdır!",
            },
          })}
        />{" "}
        {errors.title && <p className="input-error">{errors.title?.message}</p>}
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textares"
          id="description"
          rows="3"
          {...register("description", {
            required: "Task açıklaması yazılmalıdır.",
            minLength: {
              value: 15,
              message: "Açıklama minimum 15 karakterden oluşmalıdır!",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description?.message}</p>
        )}
      </div>
      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-label" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  required: "Lütfen en az 1 kişi seçiniz.",
                  validate: (arr) =>
                    arr.length <= 3 ||
                    "Maksimum seçilebilecek kişi sayısı 3'tür! ",
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people?.message}</p>
        )}
      </div>
      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}

import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorsList } from "../../../../common/components/errors-list/ErrorsList";
import { Input } from "../../../../common/components/input/Input";
import { SingleArticleInDTO } from "../../api/dto/single-article.in";
import { PostFormValues } from "../../types";
import Button from "../../../../common/components/button/Button";
import MdEditorHookForm from "../../../../common/components/md-editor-hook-form/MdEditorHookForm";

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tags: yup.string(),
});

interface PostFormProps {
  onSubmit: (values: PostFormValues) => Promise<void>;
  data?: SingleArticleInDTO;
}

export const PostForm: FC<PostFormProps> = ({ data, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tags: "",
    },
    // resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    reset({
      title: data.article.title,
      description: data.article.description,
      body: data.article.body,
      tags: data.article.tagList.join(", "),
    });
  }, [data]);

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <ErrorsList errors={errors} />
      <Input placeholder="Article Title" {...register("title")} />
      <Input
        placeholder="What's this article about"
        {...register("description")}
        size="SM"
      />
      <div data-color-mode="light">
        <MdEditorHookForm control={control} name="body" />
      </div>
      <Input placeholder="tags" {...register("tags")} size="SM" />
      <div className="flex justify-end">
        <Button
          size="LG"
          type="submit"
          btnStyle="GREEN"
          disabled={isSubmitting}
        >
          Publish article
        </Button>
      </div>
    </form>
  );
};

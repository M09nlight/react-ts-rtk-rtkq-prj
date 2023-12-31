import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateArticleInDTO } from "../api/dto/create-article.in";
import { EditArticleInDTO } from "../api/dto/edit-article.in";
import {
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetSingleArticleQuery,
} from "../api/feedApi";
import { PostForm } from "../components/post-form/PostForm";
import { PostFormValues } from "../types";
import Container from "../../../common/components/container/Container";

interface EditorPageProps {}

const EditorPage: FC<EditorPageProps> = ({}) => {
  const [triggerCreateArticle] = useCreateArticleMutation();
  const [triggerEditArticle] = useEditArticleMutation();

  const { slug } = useParams();
  const { data, isLoading } = useGetSingleArticleQuery(
    { slug: String(slug) },
    { skip: !Boolean(slug) }
  );
  debugger;
  const navigate = useNavigate();
  const onSubmit = async (values: PostFormValues) => {
    try {
      let data: CreateArticleInDTO | EditArticleInDTO;
      if (slug) {
        data = await triggerEditArticle({ ...values, slug }).unwrap();
      } else {
        data = await triggerCreateArticle(values).unwrap();
      }
      navigate(`/article/${data.article.slug}`);
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  if (slug && isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <PostForm data={data} onSubmit={onSubmit} />
    </Container>
  );
};
export default EditorPage;

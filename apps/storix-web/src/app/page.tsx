import { getQueryClient } from "@/lib/query-client";

const page = async () => {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ["test"],
    queryFn: async () => {
      return "This is server side fetch response";
    },
  });

  return (
    <div>
      This is server side fetch:{" "}
      <span className="text-red-500 font-bold">{data}</span>, Adding this to
      just verify server side react query working perfect and for the normal
      client side fetching use normal useQuery() from the @tanstack/react-query
      package
    </div>
  );
};

export default page;

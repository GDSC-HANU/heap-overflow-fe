import DateTime from "@/shared/models/dateTime";

export interface GetPostsResp {
   title : string;
   author: string;
   createdAt: string;
   updatedAt: string;
   content: string;
};

export async function getPostsApi(page : number, perPage: number, problemId : string) : Promise<GetPostsResp[]> {
  return [
    {
      title: 'Solution 1, Solution 1, Solution 1, Solution 1, Solution 1, Solution 1, Solution 1',
      author: 'quanvda',
      createdAt: '2023-03-03T08:42:40.760756Z',
      updatedAt: '2023-03-03T08:42:40.760756Z',
      content: 'Some content'
    },
    {
      title: 'Solution 2',
      author: 'quanvda',
      createdAt: '2023-03-03T08:42:40.760756Z',
      updatedAt: '2023-03-03T08:42:40.760756Z',
      content: 'Some content'
    },
    {
      title: 'Solution 3',
      author: 'quanvda',
      createdAt: '2023-03-03T08:42:40.760756Z',
      updatedAt: '2023-03-03T08:42:40.760756Z',
      content: 'Some content'
    },
    {
      title: 'Solution 1, Solution 1, Solution 1, Solution 1, Solution 1, Solution 1, Solution 1',
      author: 'quanvda',
      createdAt: '2023-03-03T08:42:40.760756Z',
      updatedAt: '2023-03-03T08:42:40.760756Z',
      content: 'Some content'
    },
    {
      title: 'Solution 2',
      author: 'quanvda',
      createdAt: '2023-03-03T08:42:40.760756Z',
      updatedAt: '2023-03-03T08:42:40.760756Z',
      content: 'Some content'
    },
    {
      title: 'Solution 3',
      author: 'quanvda',
      createdAt: '2023-03-03T08:42:40.760756Z',
      updatedAt: '2023-03-03T08:42:40.760756Z',
      content: 'Some content'
    }
  ]
}

export async function countPostsApi() {
  return 3;
}
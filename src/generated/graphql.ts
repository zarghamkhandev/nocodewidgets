import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  projects?: Maybe<Array<Project>>;
  project?: Maybe<Project>;
  votes?: Maybe<VotesData>;
};


export type QueryProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryVotesArgs = {
  projectId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Response;
  changePassword: Response;
  createProject: ProjectResponse;
  vote: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: Options;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
  option1: Scalars['String'];
  option2: Scalars['String'];
  widgetName: Scalars['String'];
  publishUrl: Scalars['String'];
};


export type MutationVoteArgs = {
  value: Scalars['String'];
  projectId: Scalars['String'];
};

export type Options = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Response = {
  __typename?: 'Response';
  errors?: Maybe<Array<Maybe<Error>>>;
  status: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<Maybe<Error>>>;
  user?: Maybe<User>;
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<Maybe<Error>>>;
  project?: Maybe<Project>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  widgetName: Scalars['String'];
  user?: Maybe<User>;
  text: Scalars['String'];
  option1: Scalars['String'];
  option2: Scalars['String'];
  createdAt: Scalars['String'];
  publishUrl?: Maybe<Scalars['String']>;
};

export type VotesData = {
  __typename?: 'VotesData';
  total: Scalars['Int'];
  option1: Scalars['Int'];
  option2: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type VoteMutationVariables = Exact<{
  value: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type ProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'text' | 'option1' | 'option2'>
  )> }
);


export const VoteDocument = gql`
    mutation vote($value: String!, $projectId: String!) {
  vote(value: $value, projectId: $projectId)
}
    `;
export const ProjectDocument = gql`
    query Project($projectId: String!) {
  project(projectId: $projectId) {
    text
    option1
    option2
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    vote(variables: VoteMutationVariables): Promise<VoteMutation> {
      return withWrapper(() => client.request<VoteMutation>(print(VoteDocument), variables));
    },
    Project(variables: ProjectQueryVariables): Promise<ProjectQuery> {
      return withWrapper(() => client.request<ProjectQuery>(print(ProjectDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
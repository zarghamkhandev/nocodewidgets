import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  widgets?: Maybe<Array<Widget>>;
  widget?: Maybe<Widget>;
  projects?: Maybe<Array<Project>>;
  project: Project;
};

export type QueryWidgetsArgs = {
  projectId: Scalars['Int'];
};

export type QueryWidgetArgs = {
  widgetId: Scalars['Int'];
};

export type QueryProjectArgs = {
  projectId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Response;
  changePassword: Response;
  createWidget: WidgetResponse;
  deleteWidget: Scalars['Boolean'];
  createProject: Project;
  sendFeedback: Scalars['Boolean'];
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

export type MutationCreateWidgetArgs = {
  widgetName: Scalars['String'];
  publishRoute: Scalars['String'];
  position: Scalars['String'];
  projectId: Scalars['Int'];
  widgetTypeId: Scalars['Int'];
  widgetProperties: Array<WidgetPropertyItemInput>;
};

export type MutationDeleteWidgetArgs = {
  widgetId: Scalars['Int'];
};

export type MutationCreateProjectArgs = {
  projectName: Scalars['String'];
  website: Scalars['String'];
};

export type MutationSendFeedbackArgs = {
  widgetId: Scalars['Int'];
  value: Scalars['String'];
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

export type WidgetResponse = {
  __typename?: 'WidgetResponse';
  errors?: Maybe<Array<Maybe<Error>>>;
  widget?: Maybe<Widget>;
};

export type WidgetPropertyItemInput = {
  propertyName: Scalars['String'];
  propertyValue: Scalars['String'];
};

export type WidgetPropertyItem = {
  __typename?: 'WidgetPropertyItem';
  propertyName: Scalars['String'];
  propertyValue: Scalars['String'];
};

export type Widget = {
  __typename?: 'Widget';
  id: Scalars['Int'];
  projectId: Scalars['Int'];
  widgetTypeId: Scalars['Int'];
  widgetName?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  publishRoute?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  feedbackData?: Maybe<FeedbackResponse>;
  widgetProperties: Array<WidgetPropertyItem>;
};

export type FeedbackResponse = {
  __typename?: 'feedbackResponse';
  type: Scalars['String'];
  data: Array<FeedbackData>;
};

export type FeedbackData = {
  __typename?: 'feedbackData';
  count: Scalars['Int'];
  value: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  projectName: Scalars['String'];
  createdAt: Scalars['String'];
  website: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type SendFeedbackMutationVariables = Exact<{
  widgetId: Scalars['Int'];
  value: Scalars['String'];
}>;

export type SendFeedbackMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'sendFeedback'
>;

export type WidgetQueryVariables = Exact<{
  widgetId: Scalars['Int'];
}>;

export type WidgetQuery = { __typename?: 'Query' } & {
  widget?: Maybe<
    { __typename?: 'Widget' } & Pick<Widget, 'id'> & {
        widgetProperties: Array<
          { __typename?: 'WidgetPropertyItem' } & Pick<
            WidgetPropertyItem,
            'propertyName' | 'propertyValue'
          >
        >;
      }
  >;
};

export const SendFeedbackDocument = gql`
  mutation sendFeedback($widgetId: Int!, $value: String!) {
    sendFeedback(widgetId: $widgetId, value: $value)
  }
`;
export const WidgetDocument = gql`
  query Widget($widgetId: Int!) {
    widget(widgetId: $widgetId) {
      id
      widgetProperties {
        propertyName
        propertyValue
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (sdkFunction) => sdkFunction();
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    sendFeedback(
      variables: SendFeedbackMutationVariables
    ): Promise<SendFeedbackMutation> {
      return withWrapper(() =>
        client.request<SendFeedbackMutation>(
          print(SendFeedbackDocument),
          variables
        )
      );
    },
    Widget(variables: WidgetQueryVariables): Promise<WidgetQuery> {
      return withWrapper(() =>
        client.request<WidgetQuery>(print(WidgetDocument), variables)
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;

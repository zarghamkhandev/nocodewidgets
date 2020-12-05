import { GraphQLClient } from 'graphql-request';

import React, { useEffect, useState } from 'react';
import {
  getSdk,
  ProjectQueryVariables,
  VoteMutationVariables,
} from '../generated/graphql';

interface CardProps {}

const Card: React.FunctionComponent<CardProps> = ({}) => {
  const [projectId, setProjectId] = useState('');
  const [votingDone, setVotingDone] = useState(false);
  const [data, setData] = useState({ text: '', option1: '', option2: '' });
  const [initialRender, setInitialRender] = useState(false);

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL || '');
  const sdk = getSdk(client);

  async function vote(variables: VoteMutationVariables) {
    const { vote } = await sdk.vote(variables);
    if (vote) {
      setVotingDone(true);
    }

    await delay(3000);
    (window as any).xprops.closeWidget();
  }
  async function getProject(variables: ProjectQueryVariables) {
    const { project } = await sdk.Project(variables);
    if (!project) {
      throw new Error('invalid project ');
    }
    const { option1, text, option2 } = project;
    setData({ option1, option2, text });
  }

  useEffect(() => {
    if (window && !initialRender) {
      setProjectId((window as any).xprops.pid);
    }
    setInitialRender(true);
  }, [initialRender]);
  useEffect(() => {
    if (initialRender) {
      getProject({ projectId });
    }
  }, [projectId]);

  const mainContent = (
    <>
      <div className="w-3/5 text-gray-700 ">{data.text}</div>
      <div className="flex ">
        <button
          className="bg-green-500 mx-1 px-8 py-1 rounded-xl text-gray-200 focus:outline-none focus:bg-green-700"
          onClick={() => {
            vote({ value: data.option1, projectId: projectId });
          }}>
          {data.option1}
        </button>
        <button
          className="bg-red-500 mx-1 px-8 py-1 rounded-xl text-gray-200 focus:outline-none focus:bg-red-700"
          onClick={() => {
            vote({ value: data.option2, projectId: projectId });
          }}>
          {data.option2}
        </button>
      </div>
    </>
  );
  return (
    <div className="flex py-3 px-4 w-full text-lg bg-gray-100 h-16 items-center">
      {votingDone ? (
        <div className="w-full text-gray-700 flex justify-center">
          Thank you for your feedback!
        </div>
      ) : (
        mainContent
      )}
    </div>
  );
};
function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
export default Card;

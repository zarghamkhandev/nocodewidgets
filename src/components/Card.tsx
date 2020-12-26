import { GraphQLClient } from 'graphql-request';

import React, { useEffect, useState } from 'react';
import {
  getSdk,
  MutationSendFeedbackArgs,
  WidgetQueryVariables,
} from '../generated/graphql';
import { find } from 'lodash';
interface CardProps {}

const Card: React.FunctionComponent<CardProps> = ({}) => {
  const [widgetId, setWidgetId] = useState<number>(0);
  const [votingDone, setVotingDone] = useState(false);
  const [data, setData] = useState({ text: '', option1: '', option2: '' });
  const [initialRender, setInitialRender] = useState(false);

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL || '');
  const sdk = getSdk(client);

  async function sendFeedback(variables: MutationSendFeedbackArgs) {
    const { sendFeedback } = await sdk.sendFeedback(variables);
    if (sendFeedback) {
      setVotingDone(true);
    }

    await delay(3000);
    (window as any).xprops.closeWidget();
  }
  async function getWidget(variables: WidgetQueryVariables) {
    const { widget } = await sdk.Widget(variables);
    if (!widget) {
      throw new Error('invalid widget ');
    }
    const { widgetProperties } = widget;
    const text = find(widgetProperties, { propertyName: 'title' })
      ?.propertyValue;
    const option1 = find(widgetProperties, { propertyName: 'option1' })
      ?.propertyValue;
    const option2 = find(widgetProperties, { propertyName: 'option2' })
      ?.propertyValue;

    if (!text || !option1 || !option2) {
      return;
    } else {
      setData({ option1, option2, text });
    }
  }

  useEffect(() => {
    if (window && !initialRender) {
      setWidgetId((window as any).xprops.widgetId);
    }
    setInitialRender(true);
  }, [initialRender]);
  useEffect(() => {
    if (initialRender) {
      getWidget({ widgetId });
    }
  }, [widgetId]);

  const mainContent = (
    <>
      <div className="w-3/5 text-gray-700 ">{data.text}</div>
      <div className="flex ">
        <button
          className="px-8 py-1 mx-1 text-gray-200 bg-green-500 rounded-xl focus:outline-none focus:bg-green-700"
          onClick={() => {
            sendFeedback({ value: data.option1, widgetId: widgetId });
          }}>
          {data.option1}
        </button>
        <button
          className="px-8 py-1 mx-1 text-gray-200 bg-red-500 rounded-xl focus:outline-none focus:bg-red-700"
          onClick={() => {
            sendFeedback({ value: data.option2, widgetId: widgetId });
          }}>
          {data.option2}
        </button>
      </div>
    </>
  );
  return (
    <div className="flex items-center w-full h-16 px-4 py-3 text-lg bg-gray-100">
      {votingDone ? (
        <div className="flex justify-center w-full text-gray-700">
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

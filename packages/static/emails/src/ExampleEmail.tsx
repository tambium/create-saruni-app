import React from "react";
import { Divider, Text, TransactionalTemplate } from "@saruni-ui/email";

interface ExampleEmailProps {}

export const ExampleEmail: React.FC<ExampleEmailProps> = ({}) => {
  return (
    <TransactionalTemplate
      components={{
        Header: (
          <React.Fragment>
            <h1 css={{ fontSize: 21 }}>Saruni</h1>
            <Divider />
          </React.Fragment>
        ),
        Body: (
          <React.Fragment>
            <Text>
              Write emails in Saruni like any other React component in your
              project, with the support of a dedicated Email UI package.
            </Text>
            <Text>
              When you’re ready to use your email templates, run the{" "}
              <code>yarn saruni gen emails</code> command to create client-ready
              HTML and inlined CSS.
            </Text>
          </React.Fragment>
        ),
      }}
      subject="Saruni makes creating emails easier!"
    />
  );
};

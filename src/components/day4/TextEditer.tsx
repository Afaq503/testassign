"use client";

import React, { useState, useRef } from "react";
import { Button, Typography, Tooltip } from "antd";

const { Text } = Typography;

interface propsdata {
  texteditable: string;
}

const TextEditor: React.FC<propsdata> = ({ texteditable }) => {
  const [variableCounter, setVariableCounter] = useState<number>(1);
  const editorRef = useRef<HTMLDivElement>(null);

  const applyFormat = (command: string) => {
    document.execCommand(command, false, "");
  };

  const addVariable = () => {
    const variableText = `{{ ${variableCounter} }}`;
    document.execCommand("insertText", false, variableText);
    setVariableCounter(variableCounter + 1); 
  };

  const addEmoji = (emoji: string) => {
    document.execCommand("insertText", false, emoji);
  };

  return (
    <div className="w-full mx-auto p-6  bg-white rounded-lg shadow-lg">
      {/* Formatting Buttons */}
      <div className="flex space-x-4 mb-4">
        <Tooltip title="Bold">
          <Button
            className="flex items-center justify-center w-10 h-10 text-black text-xl hover:bg-blue-600"
            onClick={() => applyFormat("bold")}
          >
            <b>B</b>
          </Button>
        </Tooltip>

        <Tooltip title="Italic">
          <Button
            className="flex items-center justify-center w-10 h-10  text-black text-xl hover:bg-green-600"
            onClick={() => applyFormat("italic")}
          >
            <i>I</i>
          </Button>
        </Tooltip>

        <Tooltip title="Insert Emoji">
          <Button
            className="flex items-center justify-center w-10 h-10  text-white hover:bg-yellow-500"
            onClick={() => addEmoji("😊")}
          >
            😊
          </Button>
        </Tooltip>
      </div>

      {/* Editable text area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="border p-4 w-full h-40 rounded bg-gray-100 shadow-md focus:outline-none"
        style={{ minHeight: "160px" }}
      >
        <Text className="text-black">{texteditable}</Text>
        
      </div>

      {/* Add Variable Button */}
      <div className="mt-6 flex justify-between items-center">
        <Button
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          onClick={addVariable}
          type="primary"
        >
          Add Variable
        </Button>

        <Text type="secondary" className="text-right text-sm">
          Max 1024 Characters
        </Text>
      </div>
    </div>
  );
};

export default TextEditor;

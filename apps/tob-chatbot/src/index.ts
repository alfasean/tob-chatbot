import { mastra } from "./mastra";
import { CHATBOT_NAME, CHATBOT_VERSION } from "./constants";

const initializeChatbot = async (): Promise<void> => {
  console.log(`${CHATBOT_NAME} v${CHATBOT_VERSION} is initializing...`);

  try {
    console.log(`${CHATBOT_NAME} initialized successfully!`);
    console.log("Available workflows:", Object.keys(mastra.getWorkflows()));
    console.log("Available agents:", Object.keys(mastra.getAgents()));
  } catch (error) {
    console.error("Failed to initialize chatbot:", error);
    throw error;
  }
};

initializeChatbot().catch(console.error);

export { mastra, initializeChatbot };

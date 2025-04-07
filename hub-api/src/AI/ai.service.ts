/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getStringEnv } from 'src/config';

interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

interface AIRequest {
  messages: AIMessage[];
}
interface AskQuestionResponse {
  answer: string;
}

interface AIResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

@Injectable()
export class AiService {
  private apiUrl: string;
  private apiKey: string;
  private readonly http: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.apiUrl = getStringEnv(this.configService, 'AIMLAPI_URL');
    this.apiKey = getStringEnv(this.configService, 'AIMLAPI_KEY');

    this.http = axios.create({
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async askQuestion(question: string): Promise<AskQuestionResponse> {
    const messages: AIMessage[] = [
      { role: 'system', content: 'Q&A Knowledge Base, short answers' }, // Default system message
      { role: 'user', content: question },
    ];

    const requestBody: AIRequest = {
      messages,
    };

    const response = await this.sendRequest(requestBody);
    return this.extractAnswer(response);
  }

  private async sendRequest(requestBody: AIRequest): Promise<AIResponse> {
    const body = {
      ...this.getDefaultRequestBody(),
      ...requestBody,
    };

    try {
      const response: AxiosResponse<AIResponse> = await this.http.post(
        this.apiUrl,
        body,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('AI API Error:', error.response?.data);
        throw new Error(
          `AI API request failed with status ${error.response?.status}: ${JSON.stringify(
            error.response?.data,
          )}`,
        );
      } else {
        console.error('Error sending request to AI API:', error);
        throw new Error(`Failed to send request to AI API}`);
      }
    }
  }

  private extractAnswer(response: AIResponse): AskQuestionResponse {
    if (response && response.choices && response.choices.length > 0) {
      return {
        answer: response.choices[0].message.content,
      };
    } else {
      throw new Error('Could not extract answer from AI API response.');
    }
  }

  private getDefaultRequestBody() {
    return {
      model: 'gpt-4o-mini',
      prediction: { type: 'content', content: 'text' },
      max_tokens: 100,
      stream: false,
      temperature: 1,
      top_p: 1,
      stop: 'text',
      seed: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
  }
}

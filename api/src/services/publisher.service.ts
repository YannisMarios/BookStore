import { Publisher } from 'common';
import { publishersMockData } from '../mocks/publishers.mocks';

export class PublisherService {
  private readonly publishers: Publisher[];
  static instance: PublisherService;

  private constructor() {
    this.publishers = publishersMockData();
  }

  public static getInstance(): PublisherService {
    if (!PublisherService.instance) {
      PublisherService.instance = new PublisherService();
    }
    return PublisherService.instance;
  }

  public getPublishers(): Publisher[] {
    return this.publishers;
  }

  public getPublisher(id: string): Publisher | undefined {
    return this.publishers.find((x) => x.id === id);
  }

  public searchPublisher(term: string): Publisher[] {
    return this.publishers.filter((publisher) => publisher.name.includes(term));
  }
}

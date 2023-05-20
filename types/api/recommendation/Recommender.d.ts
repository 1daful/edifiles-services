import { DateTime } from 'gorsejs/src/interfaces';
import { Gorse } from "gorsejs/src";
export declare class Recommender {
    client: Gorse<string>;
    getRecommended(userId: string, category?: string): Promise<string[]>;
    getPopular(category?: string): Promise<import("gorsejs/src").PopularOutput[]>;
    getLatest(category?: string): Promise<import("gorsejs/src").LatestOutput[]>;
    getRelated(itemId: string, category?: string): Promise<string[]>;
    insertFeedback(/*itemId: string, category: string, userId: string, score: number*/ userId: string, feedbackType: string, itemId: string, timestamp: DateTime): Promise<void>;
    insertUser(id: string): Promise<void>;
    insertItem(itemId: string, category: string): Promise<void>;
}

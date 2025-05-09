import mongoose, { Schema, Document, Model } from 'mongoose';
import { Bang } from '@/lib/bangs';

export interface ISync extends Document {
    syncId: string;
    settings: {
        searchEngine: string;
        openInNewTab: boolean;
        searchHistoryActive: boolean;
    };
    bangs: Bang[];
}

const SyncSchema: Schema = new Schema(
    {
        syncId: {
            type: String,
            required: true,
            unique: true,
        },
        settings: {
            searchEngine: {
                type: String,
                required: true,
            },
            openInNewTab: {
                type: Boolean,
                required: true,
            },
            searchHistoryActive: {
                type: Boolean,
                required: true,
            },
            theme: {
                type: String,
                required: true,
                enum: ['light', 'dark', 'system'],
            }
        },
        bangs: [
            {
                name: {
                    type: String,
                    required: true,
                },
                bang: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        expireAfterSeconds: 3600, // Automatically delete documents after 1 hour
    }
);

const SyncModel: Model<ISync> = mongoose.models.Sync || mongoose.model<ISync>('Sync', SyncSchema);

export default SyncModel;
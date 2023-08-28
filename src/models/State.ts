export interface State {
    isInstalling: boolean,
    isEnabled: boolean,
    isPinned: boolean,
    channels: string[],
};

export const state: State = {
    isInstalling: true,
    isEnabled: true,
    isPinned: false,
    channels: ["mathil1", "fextralife"],
}

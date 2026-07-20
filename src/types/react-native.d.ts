declare module 'react-native' {
  export type ViewStyle = any;
  export const View: any;
  export const Text: any;
  export const StyleSheet: any;
  export const Image: any;
  export const Pressable: any;
  export const TextInput: any;
  export const ScrollView: any;
  export const ActivityIndicator: any;
  export const KeyboardAvoidingView: any;
  export const RefreshControl: any;
  export const Platform: { OS: string };
}

declare module 'react-native-gesture-handler' {
  import { ComponentType, ReactNode } from 'react';

  export const GestureHandlerRootView: ComponentType<{
    children?: ReactNode;
    style?: any;
  }>;
}

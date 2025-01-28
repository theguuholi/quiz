import { Easing, Pressable, PressableProps,Text, View } from 'react-native';

import { THEME } from '../../styles/theme';
import { styles } from './styles';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  const scale = useSharedValue(1);
  const animatedcontainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
  }})

  const COLOR = TYPE_COLORS[type];

  const onPressIn = () => {
    scale.value = withSpring(1.1, {duration: 200})
    // scale.value = withSpring(1.5, {easing: Easing.bounce})
  }
  const onPressOut = () => {
    scale.value = withTiming(1)
  }


  return (
    <Pressable {...rest}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={
        [
          styles.container,
          animatedcontainerStyle,
          { borderColor: COLOR, backgroundColor: isChecked ? COLOR : 'transparent' }
        ]
      }>
        <Text style={
          [
            styles.title,
            { color: isChecked ? THEME.COLORS.GREY_100 : COLOR }
          ]}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
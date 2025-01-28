import { Easing, Pressable, PressableProps, Text, View } from 'react-native';

import { THEME } from '../../styles/theme';
import { styles } from './styles';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';
import { useEffect } from 'react';

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  const scale = useSharedValue(1);
  const checked = useSharedValue(0);
  const animatedcontainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", COLOR]
      )
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100]
      )
    }
  })

  const COLOR = TYPE_COLORS[type];

  const onPressIn = () => {
    scale.value = withSpring(1.1, { duration: 200 })
    // scale.value = withSpring(1.5, {easing: Easing.bounce})
  }
  const onPressOut = () => {
    scale.value = withTiming(1)
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, {
      duration: 200,
      easing: Easing.ease
    })

  }, [isChecked])


  return (
    <PressableAnimated
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.container, { borderColor: COLOR }, animatedcontainerStyle]}
      {...rest}>
      <Animated.Text style={
        [
          styles.title,
          animatedTextStyle]}>
        {title}
      </Animated.Text>
    </PressableAnimated>

  );
}
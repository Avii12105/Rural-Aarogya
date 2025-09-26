import React, { useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback({ source, src, style, onError, ...rest }) {
  const [didError, setDidError] = useState(false);

  const resolvedSource = didError
    ? { uri: ERROR_IMG_SRC }
    : source ?? (src ? { uri: src } : null);

  if (!resolvedSource) {
    return (
      <View style={[styles.fallbackBox, style]}>
        <Text style={styles.fallbackText}>No image</Text>
      </View>
    );
  }

  return (
    <Image
      source={resolvedSource}
      onError={(e) => {
        setDidError(true);
        if (onError) onError(e);
      }}
      style={style}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  fallbackBox: {
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: { color: '#6B7280', fontSize: 12 },
});

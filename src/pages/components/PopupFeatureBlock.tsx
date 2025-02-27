import type { StackProps } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import useFeatureSettings from '@pages/hooks/useFeatureSettings'
import { i18n } from '@pages/utils'
import React from 'react'
import { FeatureSwitch } from './controls/featureControls'

const PopupFeatureBlock = (props: StackProps) => {
  const [featureSettings, toggler] = useFeatureSettings()

  return (
    <Stack direction={'column'} {...props}>
      <FeatureSwitch
        isOn={featureSettings.autoRevealNsfw}
        handleChange={toggler.nsfw}
        labelContent={i18n('popup_features_revealNsfw')}
      />
      <FeatureSwitch
        isOn={featureSettings.includeVideoThumbnail}
        handleChange={toggler.thumbnail}
        labelContent={i18n('popup_features_downloadVideoThumbnail')}
      />
    </Stack>
  )
}

export default PopupFeatureBlock

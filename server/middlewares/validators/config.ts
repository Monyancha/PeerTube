import * as express from 'express'
import { body } from 'express-validator/check'
import { isUserNSFWPolicyValid, isUserVideoQuotaValid, isUserVideoQuotaDailyValid } from '../../helpers/custom-validators/users'
import { logger } from '../../helpers/logger'
import { areValidationErrors } from './utils'

const customConfigUpdateValidator = [
  body('instance.name').exists().withMessage('Should have a valid instance name'),
  body('instance.shortDescription').exists().withMessage('Should have a valid instance short description'),
  body('instance.description').exists().withMessage('Should have a valid instance description'),
  body('instance.terms').exists().withMessage('Should have a valid instance terms'),
  body('instance.defaultClientRoute').exists().withMessage('Should have a valid instance default client route'),
  body('instance.defaultNSFWPolicy').custom(isUserNSFWPolicyValid).withMessage('Should have a valid NSFW policy'),
  body('instance.customizations.css').exists().withMessage('Should have a valid instance CSS customization'),
  body('instance.customizations.javascript').exists().withMessage('Should have a valid instance JavaScript customization'),

  body('services.twitter.username').exists().withMessage('Should have a valid twitter username'),
  body('services.twitter.whitelisted').isBoolean().withMessage('Should have a valid twitter whitelisted boolean'),

  body('cache.previews.size').isInt().withMessage('Should have a valid previews cache size'),
  body('cache.captions.size').isInt().withMessage('Should have a valid captions cache size'),

  body('signup.enabled').isBoolean().withMessage('Should have a valid signup enabled boolean'),
  body('signup.limit').isInt().withMessage('Should have a valid signup limit'),
  body('signup.requiresEmailVerification').isBoolean().withMessage('Should have a valid requiresEmailVerification boolean'),

  body('admin.email').isEmail().withMessage('Should have a valid administrator email'),
  body('contactForm.enabled').isBoolean().withMessage('Should have a valid contact form enabled boolean'),

  body('user.videoQuota').custom(isUserVideoQuotaValid).withMessage('Should have a valid video quota'),
  body('user.videoQuotaDaily').custom(isUserVideoQuotaDailyValid).withMessage('Should have a valid daily video quota'),

  body('transcoding.enabled').isBoolean().withMessage('Should have a valid transcoding enabled boolean'),
  body('transcoding.allowAdditionalExtensions').isBoolean().withMessage('Should have a valid additional extensions boolean'),
  body('transcoding.threads').isInt().withMessage('Should have a valid transcoding threads number'),
  body('transcoding.resolutions.240p').isBoolean().withMessage('Should have a valid transcoding 240p resolution enabled boolean'),
  body('transcoding.resolutions.360p').isBoolean().withMessage('Should have a valid transcoding 360p resolution enabled boolean'),
  body('transcoding.resolutions.480p').isBoolean().withMessage('Should have a valid transcoding 480p resolution enabled boolean'),
  body('transcoding.resolutions.720p').isBoolean().withMessage('Should have a valid transcoding 720p resolution enabled boolean'),
  body('transcoding.resolutions.1080p').isBoolean().withMessage('Should have a valid transcoding 1080p resolution enabled boolean'),

  body('import.videos.http.enabled').isBoolean().withMessage('Should have a valid import video http enabled boolean'),
  body('import.videos.torrent.enabled').isBoolean().withMessage('Should have a valid import video torrent enabled boolean'),

  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.debug('Checking customConfigUpdateValidator parameters', { parameters: req.body })

    if (areValidationErrors(req, res)) return

    return next()
  }
]

export {
  customConfigUpdateValidator
}

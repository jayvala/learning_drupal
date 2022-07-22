<?php

namespace Drupal\location_assignment;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Datetime\DrupalDateTime;

/**
 * Class Returning current time.
 */
class CurrentTimeManager {
  /**
   * Site location config.
   *
   * @var Drupal\Core\Config\ImmutableConfig
   */
  protected $config;

  /**
   * Construct a CurrentTimeManager object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   ConfigFactoryInterface.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    $this->config = $config_factory->get('location.settings');
  }

  /**
   * Return current time.
   */
  public function getCurrentTime() {
    $timezone = $this->config->get('timezone');
    $date = new DrupalDateTime();
    $date->setTimezone(new \DateTimeZone($timezone));
    $result = $date->format('d M Y - g:i A');
    return $result;
  }

}

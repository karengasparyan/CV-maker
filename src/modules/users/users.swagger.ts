import {response} from "../main.swagger";

const signUpBody = {
  description: "User body",
  schema: {
    properties: {
      name: {
        type: "string"
      },
      last_name: {
        type: "string"
      },
      email: {
        type: "string"
      },
      password: {
        type: "string"
      },
      socials: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string"
            },
            url: {
              type: "string"
            }
          }
        }
      }
    }
  }
};

const signInBody = {
  description: "User body",
  schema: {
    properties: {
      email: {
        type: "string"
      },
      password: {
        type: "string"
      }
    }
  }
};

const signInResponse = {
  description: "User response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          last_name: {
            type: "string"
          },
          email: {
            type: "string"
          },
          password: {
            type: "string"
          },
          image: {
            type: "string"
          },
          verified_at: {
            type: "string"
          },
          socials: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              }
            }
          }
        },
        token: {
          type: "string"
        }
      }
    }
  }
};

const getMeResponse = {
  description: "User response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          last_name: {
            type: "string"
          },
          email: {
            type: "string"
          },
          password: {
            type: "string"
          },
          image: {
            type: "string"
          },
          verified_at: {
            type: "string"
          },
          socials: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              }
            }
          },
          userPlans: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string"
                },
                plan: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string"
                    },
                    name: {
                      type: "string"
                    },
                    last_name: {
                      type: "string"
                    },
                    number: {
                      type: "number"
                    },
                    disabled: {
                      type: "boolean"
                    },
                    price: {
                      type: "number"
                    },
                    product_id: {
                      type: "string"
                    },
                    price_id: {
                      type: "string"
                    },
                  }
                }
              }
            }
          },
          userCvs: {
            type: "number"
          }
        }
      }
    }
  }
};

const updateBody = {
  description: "User body",
  schema: {
    properties: {
      name: {
        type: "string"
      },
      last_name: {
        type: "string"
      },
      socials: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string"
            },
            url: {
              type: "string"
            }
          }
        }
      }
    }
  }
};

const updateResponse = {
  description: "User response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          last_name: {
            type: "string"
          },
          social_id: {
            type: "string"
          },
          customer_id: {
            type: "string"
          },
          image: {
            type: "string"
          },
          verified_at: {
            type: "string"
          },
          socials: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    }
  }
};

const updatePasswordBody = {
  description: "User body",
  schema: {
    properties: {
      oldPassword: {
        type: "string"
      },
      password: {
        type: "string"
      }
    }
  }
};

const forgotPasswordBody = {
  description: "User body",
  schema: {
    properties: {
      email: {
        type: "string"
      }
    }
  }
};

const verifyUserResponse = {
  description: "User response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          token: {
            type: "string"
          }
        }
      }
    }
  }
};

const acceptCodeForgotPasswordBody = {
  description: "User body",
  schema: {
    properties: {
      code: {
        type: "string"
      },
      password: {
        type: "string"
      }
    }
  }
};

const uploadAvatarBody = {
  description: "User response",
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

const uploadAvatarResponse = {
  description: "User response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          image: {
            type: "string"
          }
        }
      }
    }
  }
};

const OAuthLoginResponse = {
  description: "Google OAuth redirect to /google/redirect",
};

const OAuthRedirectResponse = {
  description: "Google OAuth middleware",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          token: {
            type: "string"
          }
        }
      }
    }
  }
};

const invoicesResponse = {
  description: "User invoices response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {}
        }
      }
    }
  }
};

const subscriptionsResponse = {
  description: "User subscriptions response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {}
        }
      }
    }
  }
};

export {
  signUpBody,
  signInBody,
  signInResponse,
  getMeResponse,
  updateBody,
  updateResponse,
  verifyUserResponse,
  updatePasswordBody,
  forgotPasswordBody,
  acceptCodeForgotPasswordBody,
  uploadAvatarBody,
  uploadAvatarResponse,
  OAuthLoginResponse,
  OAuthRedirectResponse,
  invoicesResponse,
  subscriptionsResponse
}
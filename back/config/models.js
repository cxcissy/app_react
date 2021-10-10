
module.exports.models = {
  schema: true,
  migrate:'alter',
  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'number', autoIncrement: true, },
  },

  dataEncryptionKeys: {
    default: 'ft5Q1brX17+Edi5rbM9wrInEsDedReKtZvLsLw3doGc='
  },
  cascadeOnDestroy: true

};

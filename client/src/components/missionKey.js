import React from 'react'

export default function missionKey() {
  return (
    <div className="my-3">
      <p>
        <span className="px-3 mr-2 bg-success" /> = Launch Success
      </p>
      <p>
        <span className="px-3 mr-2 bg-danger" /> = Launch Fail
      </p>
    </div>
  )
}
